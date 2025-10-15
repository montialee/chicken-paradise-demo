import React, { useState } from 'react';
import { Home, Egg, Users, ShoppingCart, TrendingUp, Package, QrCode, FileText, Calendar, AlertCircle, CheckCircle, Clock, DollarSign, CreditCard, TrendingDown, Wallet } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area } from 'recharts';

// Dati Mock
const mockBatches = [
  { id: 1, code: 'LOTTO-A', arrivalDate: '2025-03-01', quantity: 500, age: 8, health: 'Ottima', mortality: 2, dailyProduction: 420 },
  { id: 2, code: 'LOTTO-B', arrivalDate: '2024-09-15', quantity: 500, age: 14, health: 'Buona', mortality: 5, dailyProduction: 380 }
];

const mockProduction = [
  { date: '2025-10-15', batch: 'LOTTO-A', total: 420, defective: 8, small: 80, medium: 280, large: 60 },
  { date: '2025-10-14', batch: 'LOTTO-A', total: 415, defective: 10, small: 75, medium: 275, large: 65 },
  { date: '2025-10-13', batch: 'LOTTO-A', total: 425, defective: 5, small: 85, medium: 270, large: 70 },
  { date: '2025-10-12', batch: 'LOTTO-A', total: 418, defective: 12, small: 78, medium: 278, large: 62 },
  { date: '2025-10-11', batch: 'LOTTO-A', total: 422, defective: 8, small: 82, medium: 280, large: 60 },
  { date: '2025-10-10', batch: 'LOTTO-A', total: 410, defective: 15, small: 76, medium: 274, large: 60 },
  { date: '2025-10-09', batch: 'LOTTO-A', total: 428, defective: 7, small: 83, medium: 285, large: 60 }
];

const mockCustomers = [
  { id: 1, name: 'Ristorante Da Mario', contact: 'Mario Rossi', phone: '+39 333 1234567', email: 'mario@damario.it', type: 'Ristorante', price: 0.50, orders: 42, revenue: 2100, preference: 'L' },
  { id: 2, name: 'Pasticceria Dolce Vita', contact: 'Laura Bianchi', phone: '+39 347 9876543', email: 'info@dolcevita.it', type: 'Pasticceria', price: 0.48, orders: 38, revenue: 1824, preference: 'M' },
  { id: 3, name: 'Trattoria Il Gallo', contact: 'Giuseppe Verdi', phone: '+39 338 5551234', email: 'gallo@trattoria.it', type: 'Ristorante', price: 0.52, orders: 25, revenue: 1300, preference: 'L' },
  { id: 4, name: 'Caffè Centrale', contact: 'Anna Rossi', phone: '+39 345 7778888', email: 'info@centrale.it', type: 'Bar', price: 0.45, orders: 18, revenue: 810, preference: 'S' }
];

const mockOrders = [
  { id: 1, customer: 'Ristorante Da Mario', date: '2025-10-15', deliveryDate: '2025-10-16', quantity: 100, status: 'pending', total: 50 },
  { id: 2, customer: 'Pasticceria Dolce Vita', date: '2025-10-15', deliveryDate: '2025-10-16', quantity: 150, status: 'pending', total: 72 },
  { id: 3, customer: 'Trattoria Il Gallo', date: '2025-10-14', deliveryDate: '2025-10-15', quantity: 80, status: 'delivered', total: 41.6 },
  { id: 4, customer: 'Caffè Centrale', date: '2025-10-13', deliveryDate: '2025-10-14', quantity: 60, status: 'delivered', total: 27 }
];

const mockInventory = [
  { item: 'Mangime Bio', quantity: 850, unit: 'kg', threshold: 500, status: 'ok' },
  { item: 'Contenitori 6 uova', quantity: 180, unit: 'pz', threshold: 200, status: 'warning' },
  { item: 'Contenitori 12 uova', quantity: 95, unit: 'pz', threshold: 100, status: 'warning' },
  { item: 'Etichette', quantity: 1200, unit: 'pz', threshold: 500, status: 'ok' }
];

const weeklyData = [
  { day: 'Lun 09', production: 428, orders: 4, revenue: 320 },
  { day: 'Mar 10', production: 410, orders: 3, revenue: 280 },
  { day: 'Mer 11', production: 422, orders: 5, revenue: 420 },
  { day: 'Gio 12', production: 418, orders: 4, revenue: 380 },
  { day: 'Ven 13', production: 425, orders: 6, revenue: 450 },
  { day: 'Sab 14', production: 415, orders: 3, revenue: 340 },
  { day: 'Dom 15', production: 420, orders: 5, revenue: 420 }
];

const revenueByCustomer = [
  { name: 'Da Mario', value: 2100 },
  { name: 'Dolce Vita', value: 1824 },
  { name: 'Il Gallo', value: 1300 },
  { name: 'Centrale', value: 810 },
  { name: 'Altri', value: 966 }
];

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];

const monthlyFinancials = [
  { month: 'Gen', ricavi: 8500, costi: 5200, utile: 3300, budget_ricavi: 8000, budget_costi: 5000 },
  { month: 'Feb', ricavi: 9200, costi: 5400, utile: 3800, budget_ricavi: 8500, budget_costi: 5100 },
  { month: 'Mar', ricavi: 10100, costi: 5600, utile: 4500, budget_ricavi: 9000, budget_costi: 5200 },
  { month: 'Apr', ricavi: 11500, costi: 5900, utile: 5600, budget_ricavi: 10000, budget_costi: 5500 },
  { month: 'Mag', ricavi: 12300, costi: 6100, utile: 6200, budget_ricavi: 11000, budget_costi: 5800 },
  { month: 'Giu', ricavi: 13800, costi: 6400, utile: 7400, budget_ricavi: 12000, budget_costi: 6000 },
  { month: 'Lug', ricavi: 14200, costi: 6600, utile: 7600, budget_ricavi: 13000, budget_costi: 6200 },
  { month: 'Ago', ricavi: 13500, costi: 6500, utile: 7000, budget_ricavi: 12500, budget_costi: 6100 },
  { month: 'Set', ricavi: 14800, costi: 6700, utile: 8100, budget_ricavi: 13500, budget_costi: 6300 },
  { month: 'Ott', ricavi: 12600, costi: 6200, utile: 6400, budget_ricavi: 12000, budget_costi: 6000 }
];

const costsBreakdown = [
  { categoria: 'Mangimi', importo: 2800, percentuale: 45, budget: 2600 },
  { categoria: 'Imballaggi', importo: 950, percentuale: 15, budget: 900 },
  { categoria: 'Utenze', importo: 420, percentuale: 7, budget: 450 },
  { categoria: 'Affitto', importo: 800, percentuale: 13, budget: 800 },
  { categoria: 'Stipendi', importo: 900, percentuale: 15, budget: 1000 },
  { categoria: 'Veterinario', importo: 180, percentuale: 3, budget: 150 },
  { categoria: 'Altro', importo: 150, percentuale: 2, budget: 100 }
];

const payables = [
  { fornitore: 'Mangimi Bio Italia', importo: 1800, scadenza: '2025-10-20', tipo: 'Fornitore', giorni: 5, status: 'ok' },
  { fornitore: 'Imballaggi SRL', importo: 650, scadenza: '2025-10-25', tipo: 'Fornitore', giorni: 10, status: 'ok' },
  { fornitore: 'Ristorante Da Mario', importo: -850, scadenza: '2025-10-18', tipo: 'Cliente', giorni: 3, status: 'ok' },
  { fornitore: 'Pasticceria Dolce Vita', importo: -720, scadenza: '2025-11-15', tipo: 'Cliente', giorni: 31, status: 'ok' },
  { fornitore: 'Veterinario Associati', importo: 280, scadenza: '2025-10-12', tipo: 'Fornitore', giorni: -3, status: 'overdue' }
];

const cashFlowData = [
  { settimana: 'S1 Ott', entrate: 3200, uscite: 1800, saldo: 1400 },
  { settimana: 'S2 Ott', entrate: 2800, uscite: 1600, saldo: 1200 },
  { settimana: 'S3 Ott', entrate: 3500, uscite: 1900, saldo: 1600 },
  { settimana: 'S4 Ott', entrate: 3100, uscite: 1900, saldo: 1200 }
];

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductionForm, setShowProductionForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedTrace, setSelectedTrace] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'allevamento', label: 'Allevamento', icon: Egg },
    { id: 'clienti', label: 'Clienti', icon: Users },
    { id: 'ordini', label: 'Ordini', icon: ShoppingCart },
    { id: 'tracciabilita', label: 'Tracciabilità', icon: QrCode },
    { id: 'magazzino', label: 'Magazzino', icon: Package },
    { id: 'finanziaria', label: 'Finanziaria', icon: TrendingUp }
  ];

  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      delivered: 'bg-green-100 text-green-800',
      ok: 'bg-green-100 text-green-800',
      warning: 'bg-orange-100 text-orange-800'
    };
    const labels = {
      pending: 'In Attesa',
      delivered: 'Consegnato',
      ok: 'OK',
      warning: 'Basso'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const DashboardView = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Dashboard Operativa</h2>
        <p className="text-gray-600">Mercoledì 15 Ottobre 2025</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Egg className="w-8 h-8" />
            <span className="text-3xl font-bold">800</span>
          </div>
          <p className="text-amber-100">Uova Prodotte Oggi</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-8 h-8" />
            <span className="text-3xl font-bold">5</span>
          </div>
          <p className="text-blue-100">Ordini da Consegnare</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8" />
            <span className="text-3xl font-bold">€420</span>
          </div>
          <p className="text-green-100">Ricavi Giornalieri</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-8 h-8" />
            <span className="text-3xl font-bold">62%</span>
          </div>
          <p className="text-purple-100">Margine Operativo</p>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-800">Attenzione</h3>
            <ul className="text-sm text-yellow-700 mt-1 space-y-1">
              <li>• Contenitori 6 uova sotto soglia minima (180/200)</li>
              <li>• Lotto B: produzione in calo del 8% (monitorare)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Produzione Settimanale</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#f59e0b" strokeWidth={2} name="Uova" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Fatturato per Cliente</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={revenueByCustomer}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueByCustomer.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* To-Do Today */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Da Fare Oggi
        </h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded">
            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
            <span className="flex-1">Registrazione produzione giornaliera</span>
            <span className="text-sm text-green-600 font-medium">Completato</span>
          </div>
          <div className="flex items-center p-3 bg-amber-50 rounded">
            <Clock className="w-5 h-5 text-amber-500 mr-3" />
            <span className="flex-1">Consegna Ristorante Da Mario (ore 9:00)</span>
            <span className="text-sm text-amber-600 font-medium">In Programma</span>
          </div>
          <div className="flex items-center p-3 bg-amber-50 rounded">
            <Clock className="w-5 h-5 text-amber-500 mr-3" />
            <span className="flex-1">Consegna Pasticceria Dolce Vita (ore 10:30)</span>
            <span className="text-sm text-amber-600 font-medium">In Programma</span>
          </div>
        </div>
      </div>
    </div>
  );

  const AllevamentoView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestione Allevamento</h2>
        <button 
          onClick={() => setShowProductionForm(!showProductionForm)}
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          {showProductionForm ? 'Chiudi Form' : '+ Registra Produzione'}
        </button>
      </div>

      {showProductionForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Registrazione Produzione Giornaliera</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
              <input type="date" defaultValue="2025-10-15" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lotto</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>LOTTO-A</option>
                <option>LOTTO-B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uova Totali</label>
              <input type="number" placeholder="420" className="w-full border border-gray-300 rounded px-3 py-2 text-lg font-semibold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uova Difettose</label>
              <input type="number" placeholder="8" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calibro Piccolo</label>
              <input type="number" placeholder="80" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calibro Medio</label>
              <input type="number" placeholder="280" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Calibro Grande</label>
              <input type="number" placeholder="60" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <input type="text" placeholder="Tutto regolare" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
          </div>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition">
            Salva Produzione
          </button>
        </div>
      )}

      {/* Lotti Attivi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockBatches.map(batch => (
          <div key={batch.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{batch.code}</h3>
                <p className="text-sm text-gray-600">Arrivo: {batch.arrivalDate}</p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {batch.health}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Capi Totali</p>
                <p className="text-2xl font-bold text-gray-800">{batch.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Età (mesi)</p>
                <p className="text-2xl font-bold text-gray-800">{batch.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Produzione Giornaliera</p>
                <p className="text-2xl font-bold text-amber-600">{batch.dailyProduction} uova</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Mortalità</p>
                <p className="text-2xl font-bold text-gray-800">{batch.mortality}%</p>
              </div>
            </div>
            <button className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium transition">
              Visualizza Storico
            </button>
          </div>
        ))}
      </div>

      {/* Storico Produzione */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Storico Produzione (Ultimi 7 Giorni)</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Data</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Lotto</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Totali</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Difettose</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Piccolo</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Medio</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Grande</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockProduction.map((prod, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-800">{prod.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{prod.batch}</td>
                  <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">{prod.total}</td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">{prod.defective}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-600">{prod.small}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-600">{prod.medium}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-600">{prod.large}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ClientiView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestione Clienti (CRM)</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition">
          + Nuovo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {mockCustomers.map(customer => (
          <div key={customer.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-600">{customer.type}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Cliente VIP
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contatto</p>
                <p className="font-medium text-gray-800">{customer.contact}</p>
                <p className="text-sm text-gray-600">{customer.phone}</p>
                <p className="text-sm text-blue-600">{customer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Condizioni Commerciali</p>
                <p className="font-medium text-gray-800">€{customer.price.toFixed(2)}/uovo</p>
                <p className="text-sm text-gray-600">Pagamento: 30gg f.m.</p>
                <p className="text-sm text-gray-600">Calibro preferito: {customer.preference}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Storico</p>
                <p className="font-medium text-gray-800">{customer.orders} ordini totali</p>
                <p className="text-lg font-bold text-green-600">€{customer.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Fatturato totale</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-medium transition">
                Nuovo Ordine
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium transition">
                Storico Ordini
              </button>
              <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium transition">
                Modifica
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const OrdiniView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestione Ordini</h2>
        <button 
          onClick={() => setShowOrderForm(!showOrderForm)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          {showOrderForm ? 'Chiudi Form' : '+ Nuovo Ordine'}
        </button>
      </div>

      {showOrderForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Nuovo Ordine</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Seleziona cliente...</option>
                {mockCustomers.map(c => (
                  <option key={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Consegna</label>
              <input type="date" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantità Uova</label>
              <input type="number" placeholder="100" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <input type="text" placeholder="Note consegna..." className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
          </div>
          <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition">
            Conferma Ordine
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Data Ordine</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Consegna</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Quantità</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Totale</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Stato</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Azioni</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.deliveryDate}</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-gray-800">{order.quantity}</td>
                  <td className="px-6 py-4 text-sm text-right font-semibold text-green-600">€{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-2">DDT</button>
                    <button className="text-green-600 hover:text-green-800 text-sm font-medium">Fattura</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Pianificazione Consegne</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-amber-600 mr-3" />
              <div>
                <p className="font-medium text-gray-800">Martedì 16/10 - Mattina</p>
                <p className="text-sm text-gray-600">2 consegne programmate</p>
              </div>
            </div>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded font-medium text-sm transition">
              Ottimizza Percorso
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const TracciabilitaView = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Sistema Tracciabilità</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Genera Lotto Tracciabile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data Produzione</label>
              <input type="date" defaultValue="2025-10-15" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lotto Galline</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>LOTTO-A</option>
                <option>LOTTO-B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantità Confezioni</label>
              <input type="number" placeholder="50" className="w-full border border-gray-300 rounded px-3 py-2" />
            </div>
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium transition flex items-center justify-center">
              <QrCode className="w-5 h-5 mr-2" />
              Genera QR Code e Stampa Etichette
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Anteprima QR Code</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="bg-gray-100 rounded-lg p-8 inline-block mb-4">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600 mb-2">Codice Lotto</p>
            <p className="font-mono font-bold text-lg text-gray-800 mb-4">CP-20251015-LA-001</p>
            <button 
              onClick={() => setSelectedTrace('CP-20251015-LA-001')}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Visualizza Pagina Pubblica →
            </button>
          </div>
        </div>
      </div>

      {selectedTrace && (
        <div className="bg-white rounded-lg shadow p-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="bg-amber-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Egg className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">CHICKEN PARADISE</h2>
              <p className="text-gray-600">La Storia delle Tue Uova</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-amber-600 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Data di Deposizione</p>
                  <p className="text-gray-600">15 Ottobre 2025</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Egg className="w-5 h-5 text-amber-600 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Lotto Galline</p>
                  <p className="text-gray-600">LOTTO-A • 8 mesi • 500 capi</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Package className="w-5 h-5 text-amber-600 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Alimentazione</p>
                  <p className="text-gray-600">Mangime 100% Biologico Certificato</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Home className="w-5 h-5 text-amber-600 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Allevamento</p>
                  <p className="text-gray-600">All'aperto con accesso al pascolo</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Certificazioni</p>
                  <p className="text-gray-600">Benessere Animale • Agricoltura 4.0</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center space-x-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition">
                Scopri il Nostro Metodo
              </button>
              <button 
                onClick={() => setSelectedTrace(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const MagazzinoView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Gestione Magazzino</h2>
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition">
          + Registra Carico
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockInventory.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-purple-500" />
              <StatusBadge status={item.status} />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">{item.item}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-800">{item.quantity}</span>
              <span className="text-gray-600 ml-2">{item.unit}</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Soglia minima: {item.threshold} {item.unit}
            </div>
            {item.status === 'warning' && (
              <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm font-medium transition">
                Ordina Rifornimento
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Consumo Medio Settimanale</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={[
            { item: 'Mangime', consumo: 120 },
            { item: 'Cont. 6', consumo: 45 },
            { item: 'Cont. 12', consumo: 38 },
            { item: 'Etichette', consumo: 150 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="item" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="consumo" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const FinanziariaView = () => {
    const totaleRicavi = monthlyFinancials.reduce((sum, m) => sum + m.ricavi, 0);
    const totaleCosti = monthlyFinancials.reduce((sum, m) => sum + m.costi, 0);
    const utileNetto = totaleRicavi - totaleCosti;
    const margine = ((utileNetto / totaleRicavi) * 100).toFixed(1);
    
    const debitiTotali = payables.filter(p => p.tipo === 'Fornitore').reduce((sum, p) => sum + p.importo, 0);
    const creditiTotali = Math.abs(payables.filter(p => p.tipo === 'Cliente').reduce((sum, p) => sum + p.importo, 0));
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Controllo Finanziario</h2>
          <div className="flex gap-2">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition">
              + Registra Incasso
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition">
              + Registra Spesa
            </button>
          </div>
        </div>

        {/* KPI Finanziari */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8" />
              <span className="text-3xl font-bold">€{(totaleRicavi / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-green-100">Ricavi Totali (YTD)</p>
            <p className="text-xs text-green-200 mt-1">vs Budget: +3.2%</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8" />
              <span className="text-3xl font-bold">€{(totaleCosti / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-red-100">Costi Totali (YTD)</p>
            <p className="text-xs text-red-200 mt-1">vs Budget: -1.5%</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <span className="text-3xl font-bold">€{(utileNetto / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-blue-100">Utile Netto (YTD)</p>
            <p className="text-xs text-blue-200 mt-1">Margine: {margine}%</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <Wallet className="w-8 h-8" />
              <span className="text-3xl font-bold">€{(creditiTotali - debitiTotali).toFixed(0)}</span>
            </div>
            <p className="text-purple-100">Saldo Netto</p>
            <p className="text-xs text-purple-200 mt-1">Crediti - Debiti</p>
          </div>
        </div>

        {/* Alert Finanziari */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800">Pagamento Scaduto</h3>
              <p className="text-sm text-red-700 mt-1">
                • Veterinario Associati: €280 scaduto da 3 giorni
              </p>
            </div>
          </div>
        </div>

        {/* Grafici Principali */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ricavi vs Costi vs Budget */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Ricavi vs Costi Mensili</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="ricavi" fill="#10b981" name="Ricavi" />
                <Bar dataKey="costi" fill="#ef4444" name="Costi" />
                <Line type="monotone" dataKey="utile" stroke="#3b82f6" strokeWidth={2} name="Utile" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Budget vs Reale */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Performance vs Budget</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ricavi" stroke="#10b981" strokeWidth={2} name="Ricavi Reali" />
                <Line type="monotone" dataKey="budget_ricavi" stroke="#86efac" strokeWidth={2} strokeDasharray="5 5" name="Budget Ricavi" />
                <Line type="monotone" dataKey="costi" stroke="#ef4444" strokeWidth={2} name="Costi Reali" />
                <Line type="monotone" dataKey="budget_costi" stroke="#fca5a5" strokeWidth={2} strokeDasharray="5 5" name="Budget Costi" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Breakdown Costi */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Composizione Costi (Ottobre)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costsBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percentuale }) => `${categoria} ${percentuale}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="importo"
                >
                  {costsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Cash Flow */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Flusso di Cassa (Ottobre)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={cashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="settimana" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="entrate" fill="#10b981" name="Entrate" />
                <Bar dataKey="uscite" fill="#ef4444" name="Uscite" />
                <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={3} name="Saldo" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabelle Dettagliate */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Breakdown Costi Tabella */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Dettaglio Costi Mensili</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Categoria</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Reale</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Budget</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Δ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {costsBreakdown.map((cost, idx) => {
                    const delta = cost.importo - cost.budget;
                    const deltaPercent = ((delta / cost.budget) * 100).toFixed(1);
                    return (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-800">{cost.categoria}</td>
                        <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">€{cost.importo}</td>
                        <td className="px-4 py-3 text-sm text-right text-gray-600">€{cost.budget}</td>
                        <td className={`px-4 py-3 text-sm text-right font-medium ${delta > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {delta > 0 ? '+' : ''}{deltaPercent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scadenzario */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Scadenzario Pagamenti
            </h3>
            <div className="space-y-2">
              {payables.map((payment, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                  payment.status === 'overdue' ? 'bg-red-50 border-red-500' : 
                  payment.tipo === 'Cliente' ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'
                }`}>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{payment.fornitore}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        {payment.tipo} • Scadenza: {payment.scadenza}
                        {payment.status === 'overdue' && <span className="text-red-600 ml-2 font-medium">SCADUTO</span>}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${payment.tipo === 'Cliente' ? 'text-green-600' : 'text-gray-800'}`}>
                        {payment.tipo === 'Cliente' ? '+' : ''}€{Math.abs(payment.importo)}
                      </p>
                      <p className="text-xs text-gray-600">
                        {payment.giorni > 0 ? `tra ${payment.giorni}gg` : payment.giorni === 0 ? 'Oggi' : `${Math.abs(payment.giorni)}gg fa`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Debiti Totali:</span>
                <span className="text-lg font-bold text-red-600">€{debitiTotali.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium text-gray-700">Crediti Totali:</span>
                <span className="text-lg font-bold text-green-600">€{creditiTotali.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t">
                <span className="font-semibold text-gray-800">Saldo Netto:</span>
                <span className={`text-xl font-bold ${(creditiTotali - debitiTotali) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{(creditiTotali - debitiTotali).toFixed(0)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Riepilogo Mensile */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Riepilogo Mensile (Gen - Ott 2025)</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mese</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Ricavi</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Budget Ricavi</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Costi</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Budget Costi</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Utile</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Margine %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {monthlyFinancials.map((month, idx) => {
                  const margineMonth = ((month.utile / month.ricavi) * 100).toFixed(1);
                  return (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">{month.month}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">€{month.ricavi.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-500">€{month.budget_ricavi.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-red-600">€{month.costi.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right text-gray-500">€{month.budget_costi.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-bold text-blue-600">€{month.utile.toLocaleString()}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-800">{margineMonth}%</td>
                    </tr>
                  );
                })}
                <tr className="bg-gray-100 font-bold">
                  <td className="px-4 py-3 text-sm text-gray-800">TOTALE</td>
                  <td className="px-4 py-3 text-sm text-right text-green-600">€{totaleRicavi.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500">€{monthlyFinancials.reduce((sum, m) => sum + m.budget_ricavi, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-red-600">€{totaleCosti.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-500">€{monthlyFinancials.reduce((sum, m) => sum + m.budget_costi, 0).toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-blue-600">€{utileNetto.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-right text-gray-800">{margine}%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-2">
                <Egg className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">CHICKEN PARADISE</h1>
                <p className="text-amber-100 text-sm">Sistema Gestionale Integrato</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-100">Benvenuto, Marco</p>
              <p className="text-xs text-amber-200">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 font-medium transition whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-amber-500 text-amber-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'allevamento' && <AllevamentoView />}
        {activeTab === 'clienti' && <ClientiView />}
        {activeTab === 'ordini' && <OrdiniView />}
        {activeTab === 'tracciabilita' && <TracciabilitaView />}
        {activeTab === 'magazzino' && <MagazzinoView />}
        {activeTab === 'finanziaria' && <FinanziariaView />}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            Chicken Paradise © 2025 • Demo Gestionale v1.0 • Agricoltura 4.0
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;