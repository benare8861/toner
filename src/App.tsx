/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, ReactNode } from 'react';
import { 
  Package, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpDown, 
  Filter,
  LayoutDashboard,
  Database,
  Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ข้อมูลที่ดึงมาจากรูปภาพ
const TONER_DATA = [
  { id: 1, model: '85a', quantity: 50, brand: 'HP' },
  { id: 2, model: '107a', quantity: 20, brand: 'HP' },
  { id: 3, model: '462XL', quantity: 41, brand: 'Brother' },
  { id: 4, model: '79a', quantity: 10, brand: 'HP' },
  { id: 5, model: 'tn1000', quantity: 50, brand: 'Brother' },
  { id: 6, model: '630', quantity: 70, brand: 'Canon' },
  { id: 7, model: '17a', quantity: 41, brand: 'HP' },
  { id: 8, model: '204a', quantity: 58, brand: 'HP' },
  { id: 9, model: 'pantum', quantity: 4, brand: 'Pantum' },
  { id: 10, model: '215a', quantity: 41, brand: 'HP' },
  { id: 11, model: 'HP054', quantity: 8, brand: 'HP' },
  { id: 12, model: '3619', quantity: 77, brand: 'Brother' },
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'model' | 'quantity', direction: 'asc' | 'desc' } | null>(null);

  const filteredData = useMemo(() => {
    let data = [...TONER_DATA];
    
    if (searchTerm) {
      data = data.filter(item => 
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortConfig) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return data;
  }, [searchTerm, sortConfig]);

  const stats = useMemo(() => {
    const total = TONER_DATA.reduce((acc, curr) => acc + curr.quantity, 0);
    const lowStock = TONER_DATA.filter(item => item.quantity < 15).length;
    const modelsCount = TONER_DATA.length;
    return { total, lowStock, modelsCount };
  }, []);

  const handleSort = (key: 'model' | 'quantity') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 font-sans selection:bg-indigo-100">
      {/* แถบเมนูด้านข้าง (คอมพิวเตอร์) */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Printer size={20} />
          </div>
          <span className="font-bold text-xl tracking-tight">InkFlow</span>
        </div>

        <nav className="space-y-2">
          <NavItem icon={<LayoutDashboard size={18} />} label="แดชบอร์ด" active />
          <NavItem icon={<Database size={18} />} label="คลังสินค้า" />
          <NavItem icon={<Filter size={18} />} label="รายงาน" />
        </nav>

        <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">สถานะระบบ</p>
          <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            พร้อมใช้งาน
          </div>
        </div>
      </aside>

      {/* เนื้อหาหลัก */}
      <main className="lg:ml-64 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
        {/* ส่วนหัว */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-2"
            >
              จำนวนหมึกที่เหลือ (ศูนย์คอม)
            </motion.h1>
            <p className="text-slate-500">จัดการและตรวจสอบคลังวัสดุการพิมพ์แบบเรียลไทม์</p>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="ค้นหาตามรุ่นหรือยี่ห้อ..."
              className="pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* ส่วนสถิติ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            label="จำนวนทั้งหมด" 
            value={stats.total.toLocaleString()} 
            icon={<Package className="text-indigo-600" size={24} />}
            trend="+12% จากเดือนที่แล้ว"
          />
          <StatCard 
            label="สินค้าใกล้หมด" 
            value={stats.lowStock} 
            icon={<AlertCircle className="text-amber-500" size={24} />}
            trend="ต้องการการตรวจสอบ"
            warning={stats.lowStock > 0}
          />
          <StatCard 
            label="รุ่นที่ใช้งานอยู่" 
            value={stats.modelsCount} 
            icon={<CheckCircle2 className="text-emerald-500" size={24} />}
            trend="ทุกยี่ห้อพร้อมใช้งาน"
          />
        </div>

        {/* ตารางคลังสินค้า */}
        <motion.div 
          layout
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-bottom border-slate-100">
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">ยี่ห้อ</th>
                  <th 
                    className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => handleSort('model')}
                  >
                    <div className="flex items-center gap-2">
                      รุ่น <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th 
                    className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-indigo-600 transition-colors"
                    onClick={() => handleSort('quantity')}
                  >
                    <div className="flex items-center gap-2">
                      จำนวน <ArrowUpDown size={14} />
                    </div>
                  </th>
                  <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item) => (
                    <motion.tr 
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-tight">
                          {item.brand}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-base font-bold text-slate-900">{item.model}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <span className={`text-lg font-mono font-bold ${item.quantity < 15 ? 'text-amber-600' : 'text-slate-700'}`}>
                            {item.quantity}
                          </span>
                          <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.min((item.quantity / 80) * 100, 100)}%` }}
                              className={`h-full rounded-full ${item.quantity < 15 ? 'bg-amber-400' : 'bg-indigo-500'}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        {item.quantity < 15 ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                            <AlertCircle size={12} /> สินค้าใกล้หมด
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                            <CheckCircle2 size={12} /> มีสินค้า
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {filteredData.length === 0 && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">ไม่พบข้อมูล</h3>
              <p className="text-slate-500">ลองปรับการค้นหาหรือตัวกรองของคุณ</p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
      active 
        ? 'bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}>
      {icon}
      {label}
    </button>
  );
}

function StatCard({ label, value, icon, trend, warning = false }: { label: string, value: string | number, icon: ReactNode, trend: string, warning?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${warning ? 'bg-amber-50' : 'bg-indigo-50'}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-bold text-slate-900 mb-2">{value}</h3>
        <p className={`text-xs font-semibold ${warning ? 'text-amber-600' : 'text-slate-400'}`}>{trend}</p>
      </div>
    </motion.div>
  );
}
