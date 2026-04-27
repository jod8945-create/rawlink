import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingCart, Package, TrendingUp, TrendingDown, Plus, Minus, X, Check, AlertCircle, BarChart3, Boxes, Truck, Filter, ArrowUpRight, ArrowDownRight, Trash2, Menu, ChevronRight, Star, Building2, Store, MapPin, Shield, Heart, User, Bell, Grid3x3, LineChart, DollarSign, Activity, Edit, Warehouse, Sparkles, ArrowRight, FileText, Calculator, Send, Clock, HelpCircle, ChevronLeft, Award, Lightbulb, Target, Zap, Bot, MessageCircle, Command, Brain, Map, Navigation, Cpu, Database, Crown, Rocket, Infinity } from "lucide-react";

function LogoIcon({ size = 40 }) {
  return (
    <div className="relative overflow-hidden" style={{ width: size, height: size, borderRadius: size * 0.22, background: "linear-gradient(135deg, #3a3028 0%, #1f1a15 100%)", boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 ${size * 0.08}px ${size * 0.25}px rgba(0,0,0,0.25)` }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id={`o-${size}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F97316" /><stop offset="50%" stopColor="#EA580C" /><stop offset="100%" stopColor="#B45309" /></linearGradient>
          <linearGradient id={`d-${size}`} x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#475569" /><stop offset="50%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0f172a" /></linearGradient>
        </defs>
        <ellipse cx="58" cy="50" rx="22" ry="28" fill="none" stroke={`url(#d-${size})`} strokeWidth="7" transform="rotate(25 58 50)" />
        <ellipse cx="42" cy="50" rx="22" ry="28" fill="none" stroke={`url(#o-${size})`} strokeWidth="7" transform="rotate(-25 42 50)" />
        <path d="M 62 38 Q 66 45 64 52" fill="none" stroke={`url(#d-${size})`} strokeWidth="7" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function RawlinkText({ size = 22, light = false }) {
  return (<div className="leading-none flex items-baseline" style={{ fontSize: size, fontWeight: 800, letterSpacing: "-0.02em" }}><span style={{ color: "#F97316" }}>raw</span><span style={{ color: light ? "#F5F5F4" : "#1A1612" }}>link</span></div>);
}

const proveedores = [
  { id: 1, nombre: "Textiles del Valle S.A.", ciudad: "Cali", calificacion: 4.8, certs: ["ISO 9001", "OEKO-TEX"] },
  { id: 2, nombre: "Polímeros Andinos", ciudad: "Medellín", calificacion: 4.6, certs: ["ISO 14001"] },
  { id: 3, nombre: "QuimiColombia Ltda.", ciudad: "Bogotá", calificacion: 4.9, certs: ["ISO 9001", "REACH"] },
  { id: 4, nombre: "Metales Bucaramanga", ciudad: "Bucaramanga", calificacion: 4.5, certs: ["ASTM"] },
  { id: 5, nombre: "Cueros del Norte", ciudad: "Barranquilla", calificacion: 4.7, certs: ["LWG"] },
  { id: 6, nombre: "Plásticos Industriales SAS", ciudad: "Cali", calificacion: 4.4, certs: ["ISO 9001"] },
];

const genHist = (p, v = 0.03) => { const h = []; let x = p * (1 - Math.random() * 0.1); for (let i = 0; i < 48; i++) { x = x * (1 + (Math.random() - 0.5) * v); h.push(x); } h[h.length - 1] = p; return h; };

const materias = [
  { id: 1, nombre: "Algodón Peinado 30/1", categoria: "Textiles", unidad: "kg", proveedorId: 1, precio: 28500, precioAnt: 27000, stock: 2400, minOrden: 50, img: "🧵", desc: "Algodón peinado de alta calidad, ideal para prendas premium.", vendidos: 1245, envioRapido: true },
  { id: 2, nombre: "Poliéster Reciclado 150D", categoria: "Textiles", unidad: "kg", proveedorId: 1, precio: 19800, precioAnt: 20500, stock: 3200, minOrden: 100, img: "🧶", desc: "Poliéster 100% reciclado de botellas PET.", vendidos: 892, envioRapido: true },
  { id: 3, nombre: "Polipropileno Granulado", categoria: "Polímeros", unidad: "kg", proveedorId: 2, precio: 8450, precioAnt: 8200, stock: 15000, minOrden: 500, img: "⚗️", desc: "Polipropileno homopolímero grado inyección.", vendidos: 3420, envioRapido: false },
  { id: 4, nombre: "PVC Rígido Industrial", categoria: "Polímeros", unidad: "kg", proveedorId: 2, precio: 7200, precioAnt: 7400, stock: 8500, minOrden: 250, img: "🔬", desc: "PVC rígido para extrusión.", vendidos: 2180, envioRapido: false },
  { id: 5, nombre: "Ácido Esteárico Cosmético", categoria: "Químicos", unidad: "kg", proveedorId: 3, precio: 12800, precioAnt: 12000, stock: 1200, minOrden: 25, img: "🧪", desc: "Ácido esteárico USP para cosméticos.", vendidos: 645, envioRapido: true },
  { id: 6, nombre: "Glicerina USP", categoria: "Químicos", unidad: "L", proveedorId: 3, precio: 15500, precioAnt: 16200, stock: 800, minOrden: 20, img: "💧", desc: "Glicerina vegetal USP/FCC.", vendidos: 1089, envioRapido: true },
  { id: 7, nombre: "Lámina Acero Cold Rolled 1mm", categoria: "Metales", unidad: "m²", proveedorId: 4, precio: 45000, precioAnt: 42000, stock: 450, minOrden: 10, img: "⬜", desc: "Lámina de acero laminado en frío.", vendidos: 420, envioRapido: false },
  { id: 8, nombre: "Alambre Cobre AWG 14", categoria: "Metales", unidad: "m", proveedorId: 4, precio: 3200, precioAnt: 3100, stock: 12000, minOrden: 100, img: "🟠", desc: "Alambre de cobre electrolítico 99.9%.", vendidos: 5620, envioRapido: true },
  { id: 9, nombre: "Cuero Vacuno Full Grain", categoria: "Cueros", unidad: "pie²", proveedorId: 5, precio: 18500, precioAnt: 19000, stock: 650, minOrden: 30, img: "🟤", desc: "Cuero vacuno flor entera de alta calidad.", vendidos: 380, envioRapido: false },
  { id: 10, nombre: "ABS Industrial Negro", categoria: "Polímeros", unidad: "kg", proveedorId: 6, precio: 11200, precioAnt: 10800, stock: 4500, minOrden: 200, img: "⚫", desc: "ABS grado ingeniería.", vendidos: 1780, envioRapido: true },
  { id: 11, nombre: "Dióxido de Titanio", categoria: "Químicos", unidad: "kg", proveedorId: 3, precio: 24000, precioAnt: 24500, stock: 350, minOrden: 25, img: "⚪", desc: "TiO2 rutilo grado pigmento.", vendidos: 520, envioRapido: true },
  { id: 12, nombre: "Tela Denim 12oz", categoria: "Textiles", unidad: "m", proveedorId: 1, precio: 22000, precioAnt: 21500, stock: 1800, minOrden: 50, img: "👖", desc: "Denim 100% algodón 12oz.", vendidos: 1420, envioRapido: true },
].map(m => ({ ...m, hist: genHist(m.precio) }));

const fmtCOP = (n) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
const fmtN = (n) => new Intl.NumberFormat("es-CO").format(n);
const provById = (id) => proveedores.find(p => p.id === id);

const Estilos = () => (<style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,900&display=swap'); body{font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased;background:#1A1612} .font-mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums} .font-display{font-family:'Fraunces',serif} @keyframes slideIn{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}} .slide-in{animation:slideIn .4s ease-out both} @keyframes fadeIn{from{opacity:0}to{opacity:1}} .fade-in{animation:fadeIn .5s ease-out both} @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:.3}} .pulse-dot{animation:pulseDot 2s ease-in-out infinite} @keyframes flashG{0%{background:rgba(16,185,129,0)}30%{background:rgba(16,185,129,.25)}100%{background:rgba(16,185,129,0)}} @keyframes flashR{0%{background:rgba(239,68,68,0)}30%{background:rgba(239,68,68,.25)}100%{background:rgba(239,68,68,0)}} .flash-green{animation:flashG .8s ease-out} .flash-red{animation:flashR .8s ease-out} @keyframes glow{0%,100%{box-shadow:0 0 30px rgba(249,115,22,.3)}50%{box-shadow:0 0 60px rgba(249,115,22,.5)}} .glow{animation:glow 3s ease-in-out infinite} ::-webkit-scrollbar{width:10px;height:10px} ::-webkit-scrollbar-track{background:#0d0a08} ::-webkit-scrollbar-thumb{background:#3a3028;border-radius:5px} .grain{position:relative} .grain::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");opacity:.04;pointer-events:none;mix-blend-mode:overlay}`}</style>);

const card = { background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "12px" };
const orangeBtn = { background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)" };
const inputStyle = { background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028", borderRadius: "8px" };

function Toast({ msg }) { return (<div className="fixed top-20 right-6 z-[100] slide-in"><div className="px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3 border-l-2 border-orange-500" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)" }}><div className="w-6 h-6 rounded-full flex items-center justify-center" style={orangeBtn}><Check size={14} strokeWidth={3} className="text-stone-900" /></div><span className="text-sm font-medium text-stone-100">{msg}</span></div></div>); }

export default function App() {
  const [splashOpen, setSplashOpen] = useState(true);
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [pantalla, setPantalla] = useState("landing");
  const [vista, setVista] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [catFiltro, setCatFiltro] = useState("Todas");
  const [carrito, setCarrito] = useState([]);
  const [inventario, setInventario] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [favs, setFavs] = useState([]);
  const [matSel, setMatSel] = useState(null);
  const [carritoOpen, setCarritoOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [cotizaciones, setCotizaciones] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mapaOpen, setMapaOpen] = useState(false);
  const [planesOpen, setPlanesOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState([
    { id: 1, tipo: "precio", titulo: "Polipropileno bajó 2.4%", desc: "Buen momento para comprar", tiempo: "Hace 15 min", leida: false, icono: TrendingDown, color: "#10B981" },
    { id: 2, tipo: "stock", titulo: "Stock bajo: Dióxido de Titanio", desc: "Solo quedan 120 kg", tiempo: "Hace 2 horas", leida: false, icono: AlertCircle, color: "#F59E0B" },
    { id: 3, tipo: "pedido", titulo: "Pedido ORD-8421 despachado", desc: "Llega mañana a tu bodega", tiempo: "Hace 4 horas", leida: false, icono: Truck, color: "#3B82F6" },
    { id: 4, tipo: "cotizacion", titulo: "Nueva oferta en RFQ-7812", desc: "QuimiColombia te envió cotización", tiempo: "Hace 1 día", leida: true, icono: FileText, color: "#F97316" },
    { id: 5, tipo: "mercado", titulo: "Algodón alcanzó máximo 30d", desc: "Subió +8.2% esta semana", tiempo: "Hace 1 día", leida: true, icono: TrendingUp, color: "#EF4444" },
  ]);
  const [misProductos, setMisProductos] = useState([
    { id: 101, nombre: "Poliéster Virgen 75D", categoria: "Textiles", precio: 18500, stock: 2500, unidad: "kg", img: "🧶", vendidos: 245, activo: true },
    { id: 102, nombre: "Hilo Algodón Mercerizado", categoria: "Textiles", precio: 32000, stock: 800, unidad: "kg", img: "🧵", vendidos: 120, activo: true },
  ]);

  const cats = ["Todas", "Textiles", "Polímeros", "Químicos", "Metales", "Cueros"];
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2500); };
  const addCart = (m, c) => { const q = c ?? m.minOrden; setCarrito(p => { const e = p.find(i => i.id === m.id); return e ? p.map(i => i.id === m.id ? { ...i, cantidad: i.cantidad + q } : i) : [...p, { ...m, cantidad: q }]; }); showToast(`${m.nombre} añadido`); };
  const togFav = (id) => setFavs(p => p.includes(id) ? p.filter(f => f !== id) : [...p, id]);
  const updQty = (id, c) => { if (c <= 0) setCarrito(p => p.filter(i => i.id !== id)); else setCarrito(p => p.map(i => i.id === id ? { ...i, cantidad: c } : i)); };
  const confirmarPedido = () => {
    if (!carrito.length) return;
    const np = { id: `ORD-${Date.now().toString().slice(-6)}`, fecha: new Date().toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" }), items: carrito, total: carrito.reduce((s, i) => s + i.precio * i.cantidad, 0), estado: "Confirmado" };
    setPedidos(p => [np, ...p]);
    setInventario(prev => { const nv = [...prev]; carrito.forEach(it => { const idx = nv.findIndex(i => i.id === it.id); if (idx >= 0) nv[idx] = { ...nv[idx], cantidadActual: nv[idx].cantidadActual + it.cantidad }; else nv.push({ ...it, cantidadActual: it.cantidad, stockMin: Math.ceil(it.cantidad * 0.2) }); }); return nv; });
    setCarrito([]); setCarritoOpen(false); showToast(`Pedido ${np.id} confirmado`);
  };
  const regUso = (id, c) => { setInventario(p => p.map(i => i.id === id ? { ...i, cantidadActual: Math.max(0, i.cantidadActual - c) } : i)); showToast("Uso registrado"); };
  const ajustarMin = (id, v) => setInventario(p => p.map(i => i.id === id ? { ...i, stockMin: Math.max(0, v) } : i));
  const elimInv = (id) => { setInventario(p => p.filter(i => i.id !== id)); showToast("Item eliminado"); };

  // Cotizaciones (RFQ)
  const crearCotizacion = (cot) => {
    const nueva = {
      id: `RFQ-${Date.now().toString().slice(-6)}`,
      fecha: new Date().toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "numeric" }),
      estado: "Abierta",
      respuestas: generarRespuestasSimuladas(cot),
      ...cot
    };
    setCotizaciones(p => [nueva, ...p]);
    showToast(`Cotización ${nueva.id} enviada a proveedores`);
  };
  const aceptarCotizacion = (rfqId, respuestaId) => {
    setCotizaciones(p => p.map(r => r.id === rfqId ? { ...r, estado: "Aceptada", respuestaAceptada: respuestaId } : r));
    showToast("Cotización aceptada");
  };

  // Recetas / BOM
  const guardarReceta = (receta) => {
    if (receta.id) setRecetas(p => p.map(r => r.id === receta.id ? receta : r));
    else setRecetas(p => [...p, { ...receta, id: Date.now() }]);
    showToast(receta.id ? "Receta actualizada" : "Receta creada");
  };
  const eliminarReceta = (id) => { setRecetas(p => p.filter(r => r.id !== id)); showToast("Receta eliminada"); };

  // Cargar datos demo
  const cargarDatosDemo = () => {
    // Inventario simulado
    const invDemo = [
      { ...materias[0], cantidadActual: 1850, stockMin: 500 },
      { ...materias[1], cantidadActual: 320, stockMin: 800 },
      { ...materias[2], cantidadActual: 8200, stockMin: 1500 },
      { ...materias[5], cantidadActual: 145, stockMin: 100 },
      { ...materias[7], cantidadActual: 4500, stockMin: 1000 },
      { ...materias[9], cantidadActual: 280, stockMin: 500 },
      { ...materias[11], cantidadActual: 980, stockMin: 200 },
    ];
    setInventario(invDemo);

    // Pedidos históricos
    const pedidosDemo = [
      { id: "ORD-839421", fecha: "12 abr 2026", items: [{ ...materias[0], cantidad: 200 }, { ...materias[11], cantidad: 100 }], total: 7900000, estado: "Confirmado" },
      { id: "ORD-839102", fecha: "5 abr 2026", items: [{ ...materias[2], cantidad: 1000 }], total: 8450000, estado: "Confirmado" },
      { id: "ORD-838745", fecha: "28 mar 2026", items: [{ ...materias[5], cantidad: 60 }, { ...materias[7], cantidad: 500 }], total: 2530000, estado: "Confirmado" },
      { id: "ORD-838201", fecha: "15 mar 2026", items: [{ ...materias[9], cantidad: 300 }], total: 3360000, estado: "Confirmado" },
      { id: "ORD-837890", fecha: "8 mar 2026", items: [{ ...materias[1], cantidad: 200 }, { ...materias[0], cantidad: 100 }], total: 6810000, estado: "Confirmado" },
    ];
    setPedidos(pedidosDemo);

    // Cotizaciones
    const cotsDemo = [
      {
        id: "RFQ-892341",
        fecha: "10 abr 2026",
        producto: "Algodón Peinado 30/1",
        cantidad: 500, unidad: "kg", precioReferencia: 28500, ciudad: "Bogotá",
        notas: "Necesito certificación OEKO-TEX",
        estado: "Aceptada",
        respuestaAceptada: "R-1",
        respuestas: generarRespuestasSimuladas({ precioReferencia: 28500 }),
      },
      {
        id: "RFQ-891022",
        fecha: "8 abr 2026",
        producto: "Polipropileno Granulado",
        cantidad: 2000, unidad: "kg", precioReferencia: 8450, ciudad: "Medellín",
        notas: "",
        estado: "Abierta",
        respuestas: generarRespuestasSimuladas({ precioReferencia: 8450 }),
      },
      {
        id: "RFQ-890015",
        fecha: "1 abr 2026",
        producto: "Glicerina USP",
        cantidad: 100, unidad: "L", precioReferencia: 15500, ciudad: "Cali",
        notas: "Para línea cosmética premium",
        estado: "Abierta",
        respuestas: generarRespuestasSimuladas({ precioReferencia: 15500 }),
      },
    ];
    setCotizaciones(cotsDemo);

    // Recetas / Fórmulas
    const recetasDemo = [
      { id: 1001, nombre: "Camiseta básica algodón", unidadProducto: "1 camiseta", precioVenta: 35000, ingredientes: [{ materiaId: 1, cantidad: 0.3 }, { materiaId: 2, cantidad: 0.05 }] },
      { id: 1002, nombre: "Crema corporal hidratante", unidadProducto: "1 frasco 200ml", precioVenta: 28000, ingredientes: [{ materiaId: 5, cantidad: 0.04 }, { materiaId: 6, cantidad: 0.06 }, { materiaId: 11, cantidad: 0.005 }] },
      { id: 1003, nombre: "Botella PET 500ml", unidadProducto: "1 botella", precioVenta: 850, ingredientes: [{ materiaId: 3, cantidad: 0.025 }] },
    ];
    setRecetas(recetasDemo);

    // Favoritos
    setFavs([1, 3, 6, 8]);

    showToast("✨ Datos demo cargados exitosamente");
  };

  const limpiarDatos = () => {
    setInventario([]);
    setPedidos([]);
    setCotizaciones([]);
    setRecetas([]);
    setFavs([]);
    setCarrito([]);
    showToast("Datos limpiados");
  };

  // Notificaciones
  const marcarLeida = (id) => setNotificaciones(p => p.map(n => n.id === id ? { ...n, leida: true } : n));
  const marcarTodasLeidas = () => setNotificaciones(p => p.map(n => ({ ...n, leida: true })));
  const notifsNoLeidas = notificaciones.filter(n => !n.leida).length;

  // Atajos de teclado (Cmd+K)
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
      if (e.key === "Escape") {
        setCmdOpen(false);
        setChatOpen(false);
        setNotifOpen(false);
        setMapaOpen(false);
        setPlanesOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const total = carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);

  if (splashOpen) return <SplashScreen onDone={() => setSplashOpen(false)} />;
  if (pantalla === "landing") return <Landing onSel={(r) => { setPantalla(r); setVista("inicio"); }} />;
  if (pantalla === "proveedor") return <ProveedorApp onVolver={() => setPantalla("landing")} misProductos={misProductos} setMisProductos={setMisProductos} showToast={showToast} toast={toast} />;

  return (
    <div className="min-h-screen text-stone-100" style={{ fontFamily: "'Inter', sans-serif", background: "#1A1612" }}>
      <Estilos />
      {toast && <Toast msg={toast} />}
      <header className="sticky top-0 z-40 border-b border-stone-800/80" style={{ background: "rgba(26, 22, 18, 0.95)", backdropFilter: "blur(12px)" }}>
        <div className="border-b border-stone-800/60" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-3"><span className="flex items-center gap-1.5"><MapPin size={11} className="text-orange-500" />Bogotá D.C.</span><span className="hidden md:inline text-stone-500">·</span><button onClick={cargarDatosDemo} className="flex items-center gap-1 px-2 py-0.5 rounded text-orange-400 hover:text-orange-300 font-semibold" style={{ background: "rgba(249, 115, 22, 0.1)", border: "1px solid rgba(249, 115, 22, 0.3)" }}><Database size={10} />Cargar demo</button>{(inventario.length > 0 || pedidos.length > 0) && <button onClick={limpiarDatos} className="hidden md:flex items-center gap-1 text-stone-500 hover:text-red-400"><Trash2 size={10} />Limpiar</button>}</div>
            <div className="flex items-center gap-3"><button onClick={() => setPlanesOpen(true)} className="flex items-center gap-1 text-orange-400 hover:text-orange-300 font-semibold"><Crown size={11} />Planes</button><button onClick={() => setPantalla("landing")} className="hover:text-orange-400 flex items-center gap-1"><User size={11} /> Cambiar perfil</button></div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-8 py-3.5">
            <button onClick={() => setVista("inicio")} className="flex items-center gap-2.5 flex-shrink-0">
              <LogoIcon size={42} />
              <div><RawlinkText size={22} light /><div className="text-[9px] text-stone-500 leading-none mt-1 tracking-[0.2em] font-mono">CONEXIÓN DIRECTA</div></div>
            </button>
            <div className="flex-1 max-w-3xl hidden md:block">
              <div className="relative">
                <input type="text" value={busqueda} onChange={(e) => { setBusqueda(e.target.value); if (e.target.value) setVista("marketplace"); }} placeholder="Buscar materias primas..." className="w-full pl-4 pr-14 py-3 text-sm focus:outline-none text-stone-100 placeholder:text-stone-500" style={inputStyle} />
                <button className="absolute right-1 top-1 bottom-1 px-4 text-white rounded-md" style={{ background: "linear-gradient(135deg, #F97316, #B45309)" }}><Search size={16} /></button>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={() => setCmdOpen(true)} className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-stone-400 hover:text-orange-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>
                <Command size={12} />
                <span>K</span>
              </button>
              <button onClick={() => setMapaOpen(true)} className="flex flex-col items-center text-xs text-stone-400 hover:text-orange-400 px-2 transition-colors" title="Mapa de proveedores"><Map size={18} /><span className="mt-0.5 hidden sm:inline">Mapa</span></button>
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative flex flex-col items-center text-xs text-stone-400 hover:text-orange-400 px-2 transition-colors">
                <Bell size={18} />
                <span className="mt-0.5 hidden sm:inline">Alertas</span>
                {notifsNoLeidas > 0 && (
                  <span className="absolute -top-1 right-0 text-stone-900 text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}>{notifsNoLeidas}</span>
                )}
              </button>
              <button onClick={() => setCarritoOpen(true)} className="relative flex flex-col items-center text-xs text-stone-300 hover:text-orange-400 px-2 transition-colors">
                <ShoppingCart size={18} /><span className="mt-0.5 hidden sm:inline">Carrito</span>
                {carrito.length > 0 && <span className="absolute -top-1 right-0 text-stone-900 text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1" style={orangeBtn}>{carrito.length}</span>}
              </button>
            </div>
          </div>
          <div className="md:hidden pb-3"><div className="relative"><input type="text" value={busqueda} onChange={(e) => { setBusqueda(e.target.value); if (e.target.value) setVista("marketplace"); }} placeholder="Buscar..." className="w-full pl-4 pr-14 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none" style={inputStyle} /><button className="absolute right-1 top-1 bottom-1 px-4 text-white rounded-md" style={{ background: "linear-gradient(135deg, #F97316, #B45309)" }}><Search size={14} /></button></div></div>
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {[{ id: "inicio", label: "Inicio", icon: Grid3x3 }, { id: "marketplace", label: "Catálogo", icon: Store }, { id: "mercado", label: "Mercado", icon: LineChart, hl: true }, { id: "cotizaciones", label: "Cotizaciones", icon: FileText, badge: "NEW" }, { id: "costos", label: "Costos", icon: Calculator, badge: "NEW" }, { id: "inventario", label: "Inventario", icon: Boxes }, { id: "pedidos", label: "Pedidos", icon: Truck }, { id: "analitica", label: "Analítica", icon: BarChart3 }].map(it => {
              const Ic = it.icon; const a = vista === it.id;
              return (<button key={it.id} onClick={() => setVista(it.id)} data-tour={it.id} className="relative flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap rounded-md" style={{ color: a ? "#F97316" : "#a8a29e", background: a ? "rgba(249, 115, 22, 0.08)" : "transparent" }}><Ic size={14} />{it.label}{it.hl && !a && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot"></span>}{it.badge && !a && <span className="text-[8px] font-bold px-1 py-0.5 rounded" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", color: "#1a1612" }}>{it.badge}</span>}</button>);
            })}
          </div>
        </div>
      </header>
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
        {vista === "inicio" && <Inicio favs={favs} togFav={togFav} addCart={addCart} setMatSel={setMatSel} setVista={setVista} setCatFiltro={setCatFiltro} />}
        {vista === "marketplace" && <Marketplace busqueda={busqueda} cats={cats} catFiltro={catFiltro} setCatFiltro={setCatFiltro} favs={favs} togFav={togFav} addCart={addCart} setMatSel={setMatSel} />}
        {vista === "mercado" && <Mercado setMatSel={setMatSel} />}
        {vista === "cotizaciones" && <Cotizaciones cotizaciones={cotizaciones} crearCotizacion={crearCotizacion} aceptarCotizacion={aceptarCotizacion} />}
        {vista === "costos" && <Costos recetas={recetas} guardarReceta={guardarReceta} eliminarReceta={eliminarReceta} />}
        {vista === "inventario" && <Inventario inventario={inventario} regUso={regUso} ajustarMin={ajustarMin} elim={elimInv} ir={() => setVista("marketplace")} />}
        {vista === "pedidos" && <Pedidos pedidos={pedidos} ir={() => setVista("marketplace")} />}
        {vista === "analitica" && <Analitica inventario={inventario} pedidos={pedidos} />}
      </main>

      {tourActive && <TourGuiado step={tourStep} setStep={setTourStep} onClose={() => setTourActive(false)} vista={vista} setVista={setVista} />}

      {/* Botones flotantes */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3 items-end">
        <a href="https://wa.me/573143844070?text=Hola%20rawlink%20%F0%9F%91%8B%2C%20necesito%20ayuda" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:-translate-y-0.5 hover:scale-110 transition-all" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 8px 24px rgba(37, 211, 102, 0.5)" }} title="WhatsApp">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <button onClick={() => setChatOpen(true)} className="px-5 py-3 rounded-full flex items-center gap-2 text-white font-bold hover:-translate-y-0.5 transition-all relative" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)", border: "1px solid #475569", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)" }} title="Asistente IA">
          <div className="relative">
            <Bot size={20} className="text-orange-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></span>
          </div>
          <span className="text-sm hidden md:inline">Asistente IA</span>
        </button>
        <button onClick={() => { setTourActive(true); setTourStep(0); }} className="px-5 py-3 rounded-full flex items-center gap-2 text-stone-900 font-bold hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 10px 30px rgba(249, 115, 22, 0.5)" }} title="Iniciar tour">
          <HelpCircle size={20} />
          <span className="text-sm hidden md:inline">Tour guiado</span>
        </button>
      </div>

      {/* Modales de nuevas features */}
      {chatOpen && <ChatIA onClose={() => setChatOpen(false)} />}
      {cmdOpen && <CommandPalette onClose={() => setCmdOpen(false)} setVista={setVista} setCarritoOpen={setCarritoOpen} setChatOpen={setChatOpen} setMapaOpen={setMapaOpen} setNotifOpen={setNotifOpen} setPantalla={setPantalla} setMatSel={setMatSel} />}
      {notifOpen && <NotifPanel notificaciones={notificaciones} onClose={() => setNotifOpen(false)} marcarLeida={marcarLeida} marcarTodas={marcarTodasLeidas} />}
      {mapaOpen && <MapaProveedores onClose={() => setMapaOpen(false)} />}
      {planesOpen && <ModalPlanes onClose={() => setPlanesOpen(false)} showToast={showToast} />}
      <footer className="border-t border-stone-800 mt-16" style={{ background: "#0d0a08" }}>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1"><div className="flex items-center gap-2 mb-4"><LogoIcon size={36} /><RawlinkText size={20} light /></div><p className="text-xs leading-relaxed text-stone-400 mb-2">La plataforma B2B que conecta la industria colombiana con proveedores verificados.</p><p className="text-xs italic text-orange-500/70">Conexión directa y auténtica.</p></div>
            <div><div className="text-stone-200 font-semibold mb-3 text-sm">Categorías</div><ul className="space-y-2 text-xs text-stone-500"><li>Textiles</li><li>Polímeros</li><li>Químicos</li><li>Metales</li></ul></div>
            <div><div className="text-stone-200 font-semibold mb-3 text-sm">Soporte</div><ul className="space-y-2 text-xs text-stone-500"><li>Centro de ayuda</li><li>Contacto</li><li>Garantías</li></ul></div>
            <div><div className="text-stone-200 font-semibold mb-3 text-sm">Empresa</div><ul className="space-y-2 text-xs text-stone-500"><li>Sobre rawlink</li><li>Proveedores</li><li>Certificaciones</li></ul></div>
          </div>
          <div className="border-t border-stone-800 pt-6 text-xs text-center text-stone-600">© 2026 rawlink · Plataforma B2B · Colombia</div>
        </div>
      </footer>
      {matSel && <ModalDetalle materia={matSel} onClose={() => setMatSel(null)} addCart={addCart} favs={favs} togFav={togFav} />}
      {carritoOpen && <PanelCarrito carrito={carrito} total={total} onClose={() => setCarritoOpen(false)} updQty={updQty} confirmarPedido={confirmarPedido} />}
    </div>
  );
}

function Landing({ onSel }) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "#1A1612", fontFamily: "'Inter', sans-serif" }}>
      <Estilos />
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top left, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(30, 41, 59, 0.4) 0%, transparent 50%)" }}></div>
        <div className="absolute inset-0 grain"></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)`, backgroundSize: '80px 80px' }}></div>
      </div>
      <div className="relative min-h-screen flex flex-col">
        <div className="px-6 lg:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3"><LogoIcon size={48} /><div><RawlinkText size={26} light /><div className="text-stone-500 text-[10px] font-mono tracking-[0.25em] mt-1.5">CONEXIÓN DIRECTA Y AUTÉNTICA</div></div></div>
          <div className="hidden md:flex items-center gap-6 text-sm text-stone-400"><button className="hover:text-orange-400">Ayuda</button><button className="hover:text-orange-400">Contacto</button></div>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-10">
          <div className="max-w-6xl w-full">
            <div className="text-center mb-14 fade-in">
              <div className="flex justify-center mb-10"><div className="relative"><div className="absolute inset-0 bg-orange-500/40 blur-3xl rounded-full glow"></div><div className="relative"><LogoIcon size={120} /></div></div></div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono tracking-wider mb-7" style={{ background: "rgba(249, 115, 22, 0.08)", borderColor: "rgba(249, 115, 22, 0.3)", color: "#FB923C" }}>
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full pulse-dot"></span>247 PROVEEDORES ACTIVOS · PRECIOS EN VIVO
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-stone-100 leading-[1.05] tracking-tight mb-6 font-display">Materias primas,<br /><span className="italic" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>conectadas en tiempo real.</span></h1>
              <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">La plataforma B2B que une a la industria colombiana con proveedores verificados.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
              <CardRol icono={Building2} num="01" titulo="Soy Empresa" desc="Busco materias primas para mi producción: confección, calzado, construcción, manufactura, cosméticos o plásticos." benef={["12.000+ materias primas verificadas", "Comparación de precios en tiempo real", "Inventario y análisis P&L integrado"]} color="#F97316" btn="Entrar como empresa" onClick={() => onSel("empresa")} />
              <CardRol icono={Warehouse} num="02" titulo="Soy Proveedor" desc="Ofrezco materias primas a la industria: telas, polímeros, químicos, metales, cueros u otros insumos especializados." benef={["Publica y gestiona tu catálogo", "Recibe pedidos de empresas verificadas", "Dashboard de ventas y analítica"]} color="#10B981" btn="Entrar como proveedor" onClick={() => onSel("proveedor")} />
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {[{ v: "12K+", l: "Materias primas" }, { v: "247", l: "Proveedores" }, { v: "6", l: "Industrias" }, { v: "24/7", l: "Precios en vivo" }].map(s => (<div key={s.l} className="border-l-2 border-orange-500/30 pl-4 text-left md:text-center md:border-l-0"><div className="text-3xl md:text-4xl font-black font-display" style={{ color: "#F97316" }}>{s.v}</div><div className="text-xs text-stone-500 uppercase tracking-[0.2em] mt-1 font-mono">{s.l}</div></div>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardRol({ icono: Ic, num, titulo, desc, benef, color, btn, onClick }) {
  return (
    <button onClick={onClick} className="group relative text-left p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden" style={{ background: "linear-gradient(135deg, #2a2018 0%, #1a1612 100%)", border: "1px solid #3a3028", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl -translate-y-12 translate-x-12" style={{ background: `${color}20` }}></div>
      <div className="relative">
        <div className="w-14 h-14 flex items-center justify-center mb-5 transition-transform group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)`, borderRadius: "14px", boxShadow: `0 8px 24px ${color}40` }}><Ic size={26} className="text-white" strokeWidth={2} /></div>
        <div className="text-[10px] font-mono tracking-[0.3em] mb-2" style={{ color }}>PERFIL {num}</div>
        <h3 className="text-2xl font-black text-stone-100 mb-3 font-display">{titulo}</h3>
        <p className="text-stone-400 text-sm mb-6 leading-relaxed">{desc}</p>
        <div className="space-y-2.5 mb-7">{benef.map(b => (<div key={b} className="flex items-start gap-2.5 text-sm text-stone-300"><div className="w-4 h-4 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}20` }}><Check size={10} strokeWidth={3} style={{ color }} /></div><span>{b}</span></div>))}</div>
        <div className="flex items-center gap-2 font-semibold text-sm" style={{ color }}>{btn}<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></div>
      </div>
    </button>
  );
}

function Inicio({ favs, togFav, addCart, setMatSel, setVista, setCatFiltro }) {
  const dest = materias.slice(0, 6);
  const top = [...materias].sort((a, b) => b.vendidos - a.vendidos).slice(0, 4);
  const ofertas = materias.filter(m => m.precio < m.precioAnt).slice(0, 4);
  const cats = [{ n: "Textiles", i: "🧵" }, { n: "Polímeros", i: "⚗️" }, { n: "Químicos", i: "🧪" }, { n: "Metales", i: "⚙️" }, { n: "Cueros", i: "🟤" }, { n: "Construcción", i: "🏗️" }];

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden grain" style={{ background: "linear-gradient(135deg, #2a2018 0%, #1a1612 50%, #0d0a08 100%)", border: "1px solid #3a3028", borderRadius: "20px" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 60%)" }}></div>
        <div className="relative p-8 md:p-12 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono tracking-wider mb-4" style={{ background: "rgba(249, 115, 22, 0.1)", borderColor: "rgba(249, 115, 22, 0.3)", color: "#FB923C" }}><Activity size={12} />MERCADO EN VIVO</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight mb-3 text-stone-100 font-display">Insumos para tu industria,<br /><span style={{ color: "#F97316" }}>sin intermediarios.</span></h2>
            <p className="text-stone-400 mb-6 max-w-lg">Compara precios al instante, compra directo al proveedor y gestiona tu inventario en un solo lugar.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setVista("marketplace")} className="px-5 py-2.5 font-semibold transition-all hover:-translate-y-0.5 text-stone-900" style={{ ...orangeBtn, borderRadius: "10px" }}>Explorar catálogo</button>
              <button onClick={() => setVista("mercado")} className="px-5 py-2.5 font-semibold text-stone-100 flex items-center gap-2" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}><LineChart size={16} />Ver mercado</button>
            </div>
          </div>
          <div className="hidden md:flex justify-end"><div className="grid grid-cols-2 gap-3 max-w-sm">{["🧵", "⚗️", "🧪", "⚙️"].map((e, i) => (<div key={i} className="aspect-square flex items-center justify-center text-6xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "16px" }}>{e}</div>))}</div></div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-black text-stone-100 font-display">Categorías</h2><button onClick={() => setVista("marketplace")} className="text-sm text-orange-500 font-semibold flex items-center gap-1">Ver todas <ChevronRight size={14} /></button></div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">{cats.map(c => (<button key={c.n} onClick={() => { setCatFiltro(c.n === "Construcción" ? "Todas" : c.n); setVista("marketplace"); }} className="p-4 text-center transition-all hover:-translate-y-1" style={card}><div className="text-3xl md:text-4xl mb-2">{c.i}</div><div className="text-xs md:text-sm font-semibold text-stone-200">{c.n}</div></button>))}</div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-black text-stone-100 flex items-center gap-2 font-display"><Sparkles size={18} className="text-orange-500" />Destacados</h2><p className="text-xs text-stone-500">Seleccionados por nuestro equipo</p></div></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">{dest.map(m => <Card key={m.id} m={m} favs={favs} togFav={togFav} addCart={addCart} setMatSel={setMatSel} />)}</div>
      </section>

      {ofertas.length > 0 && (
        <section className="p-6 grain relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2a1a18 0%, #1a1612 100%)", border: "1px solid #4a2820", borderRadius: "20px" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 60%)" }}></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-black text-stone-100 flex items-center gap-2 font-display"><span className="px-2 py-0.5 rounded text-xs font-bold text-stone-900" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}>OFERTAS</span>Precios a la baja</h2></div></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{ofertas.map(m => <Card key={m.id} m={m} favs={favs} togFav={togFav} addCart={addCart} setMatSel={setMatSel} />)}</div>
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-black text-stone-100 flex items-center gap-2 font-display"><TrendingUp size={18} className="text-emerald-500" />Más vendidos</h2></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">{top.map((m, i) => <CardTop key={m.id} m={m} rank={i + 1} favs={favs} togFav={togFav} addCart={addCart} setMatSel={setMatSel} />)}</div>
      </section>
    </div>
  );
}

function Card({ m, favs, togFav, addCart, setMatSel }) {
  const p = provById(m.proveedorId);
  const v = ((m.precio - m.precioAnt) / m.precioAnt) * 100;
  const sub = v > 0;
  const ef = favs.includes(m.id);
  return (
    <div className="overflow-hidden hover:border-orange-500/50 transition-all group" style={card}>
      <div className="relative aspect-square flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1612, #0d0a08)", borderBottom: "1px solid #3a3028" }}>
        <button onClick={() => setMatSel(m)} className="text-6xl md:text-7xl group-hover:scale-110 transition-transform">{m.img}</button>
        <button onClick={() => togFav(m.id)} className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid #3a3028" }}><Heart size={14} className={ef ? "fill-orange-500 text-orange-500" : "text-stone-400"} /></button>
        {m.envioRapido && <div className="absolute top-2 left-2 text-stone-900 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}><Activity size={8} /> RÁPIDO</div>}
      </div>
      <div className="p-3">
        <button onClick={() => setMatSel(m)} className="text-left w-full"><div className="text-sm font-semibold text-stone-100 line-clamp-2 min-h-[40px] group-hover:text-orange-400">{m.nombre}</div></button>
        <div className="text-lg font-black text-stone-100 mt-1 font-display">{fmtCOP(m.precio)}</div>
        <div className="flex items-center justify-between mt-1"><span className="text-[10px] text-stone-500">por {m.unidad}</span><span className={`font-mono text-[10px] font-bold flex items-center gap-0.5 ${sub ? "text-red-400" : "text-emerald-400"}`}>{sub ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}{Math.abs(v).toFixed(1)}%</span></div>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-stone-500"><Star size={10} className="fill-orange-500 text-orange-500" /><span>{p.calificacion}</span><span>·</span><span>{m.vendidos} vendidos</span></div>
        <button onClick={() => addCart(m)} className="w-full mt-2 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1 text-stone-100 hover:text-stone-900" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }} onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #F97316, #EA580C)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,0,0,0.4)"; }}><ShoppingCart size={12} />Agregar</button>
      </div>
    </div>
  );
}

function CardTop({ m, rank, favs, togFav, addCart, setMatSel }) {
  const p = provById(m.proveedorId);
  const ef = favs.includes(m.id);
  return (
    <div className="overflow-hidden hover:border-orange-500/50 transition-all flex flex-col" style={{ ...card, borderRadius: "14px" }}>
      <div className="relative h-48 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1a1612, #0d0a08)", borderBottom: "1px solid #3a3028" }}>
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-stone-900" style={orangeBtn}>#{rank}</div>
        <button onClick={() => setMatSel(m)} className="text-8xl">{m.img}</button>
        <button onClick={() => togFav(m.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.6)", border: "1px solid #3a3028" }}><Heart size={16} className={ef ? "fill-orange-500 text-orange-500" : "text-stone-400"} /></button>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-[10px] font-mono text-orange-500 tracking-wider uppercase">{m.categoria}</div>
        <button onClick={() => setMatSel(m)} className="text-left"><div className="font-semibold text-stone-100 line-clamp-2 mt-1 min-h-[44px]">{m.nombre}</div></button>
        <div className="flex items-center gap-1 mt-1 text-xs text-stone-500"><Star size={11} className="fill-orange-500 text-orange-500" /><span className="font-semibold text-stone-300">{p.calificacion}</span><span>({m.vendidos} vendidos)</span></div>
        <div className="mt-3"><div className="text-2xl font-black text-stone-100 font-display">{fmtCOP(m.precio)}</div><div className="text-xs text-stone-500">por {m.unidad}</div></div>
        <button onClick={() => addCart(m)} className="mt-auto pt-3 w-full text-stone-900 text-sm font-bold py-2.5 rounded-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={orangeBtn}><ShoppingCart size={14} />Añadir al carrito</button>
      </div>
    </div>
  );
}

function Marketplace({ busqueda, cats, catFiltro, setCatFiltro, favs, togFav, addCart, setMatSel }) {
  const [orden, setOrden] = useState("relevancia");
  const filt = useMemo(() => {
    let f = materias.filter(m => m.nombre.toLowerCase().includes(busqueda.toLowerCase()) && (catFiltro === "Todas" || m.categoria === catFiltro));
    if (orden === "precio-asc") f.sort((a, b) => a.precio - b.precio);
    if (orden === "precio-desc") f.sort((a, b) => b.precio - a.precio);
    if (orden === "vendidos") f.sort((a, b) => b.vendidos - a.vendidos);
    return f;
  }, [busqueda, catFiltro, orden]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
      <aside className="space-y-4">
        <div className="p-4" style={card}>
          <div className="flex items-center gap-2 mb-3"><Filter size={14} className="text-orange-500" /><h3 className="font-bold text-sm text-stone-100">Categorías</h3></div>
          <div className="space-y-1">{cats.map(c => (<button key={c} onClick={() => setCatFiltro(c)} className="w-full text-left px-3 py-2 rounded-lg text-sm flex items-center justify-between" style={{ background: catFiltro === c ? "rgba(249, 115, 22, 0.1)" : "transparent", color: catFiltro === c ? "#F97316" : "#a8a29e", fontWeight: catFiltro === c ? 600 : 400 }}>{c}{catFiltro === c && <ChevronRight size={12} />}</button>))}</div>
        </div>
        <div className="p-4" style={card}><h3 className="font-bold text-sm text-stone-100 mb-3">Envío</h3><label className="flex items-center gap-2 text-sm text-stone-300"><input type="checkbox" className="accent-orange-500" /><Activity size={12} className="text-emerald-500" />Envío rápido</label><label className="flex items-center gap-2 text-sm text-stone-300 mt-2"><input type="checkbox" className="accent-orange-500" />Envío gratis</label></div>
        <div className="p-4" style={card}><h3 className="font-bold text-sm text-stone-100 mb-3">Certificaciones</h3>{["ISO 9001", "ISO 14001", "OEKO-TEX", "REACH", "ASTM"].map(c => (<label key={c} className="flex items-center gap-2 text-sm text-stone-300 mt-2 first:mt-0"><input type="checkbox" className="accent-orange-500" />{c}</label>))}</div>
        <div className="p-4 grain relative overflow-hidden" style={{ background: "linear-gradient(135deg, #2a1a08, #1a1612)", border: "1px solid #4a3818", borderRadius: "12px" }}><Shield size={20} className="text-orange-500 mb-2" /><h3 className="font-bold text-sm text-stone-100 mb-1">Compra protegida</h3><p className="text-xs text-stone-400">Todas las transacciones están respaldadas por rawlink.</p></div>
      </aside>
      <div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div><h1 className="text-2xl font-black text-stone-100 font-display">{catFiltro === "Todas" ? "Todos los productos" : catFiltro}</h1><p className="text-sm text-stone-500">{filt.length} resultados</p></div>
          <div className="flex items-center gap-2"><span className="text-xs text-stone-500">Ordenar:</span><select value={orden} onChange={e => setOrden(e.target.value)} className="px-3 py-2 text-sm focus:outline-none text-stone-100" style={inputStyle}><option value="relevancia">Más relevantes</option><option value="precio-asc">Menor precio</option><option value="precio-desc">Mayor precio</option><option value="vendidos">Más vendidos</option></select></div>
        </div>
        {filt.length === 0 ? (<div className="p-16 text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px dashed #3a3028", borderRadius: "12px" }}><AlertCircle size={48} className="mx-auto text-stone-600 mb-4" /><h3 className="text-xl font-bold text-stone-300">Sin resultados</h3></div>) : (<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">{filt.map(m => <Card key={m.id} m={m} favs={favs} togFav={togFav} addCart={addCart} setMatSel={setMatSel} />)}</div>)}
      </div>
    </div>
  );
}

function Mercado({ setMatSel }) {
  const [cat, setCat] = useState("Todas");
  const [bus, setBus] = useState("");
  const [precios, setPrecios] = useState(() => materias.map(m => ({ ...m, live: m.precio, flash: null })));
  const [sel, setSel] = useState(materias[0].id);

  useEffect(() => {
    const i = setInterval(() => {
      setPrecios(prev => prev.map(m => {
        if (Math.random() > 0.3) return m;
        const v = (Math.random() - 0.48) * 0.012;
        const n = Math.max(100, m.live * (1 + v));
        return { ...m, live: n, flash: n > m.live ? "g" : "r" };
      }));
    }, 1800);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { const t = setTimeout(() => setPrecios(p => p.map(x => ({ ...x, flash: null }))), 800); return () => clearTimeout(t); }, [precios]);

  const cats = ["Todas", "Textiles", "Polímeros", "Químicos", "Metales", "Cueros"];
  const filt = precios.filter(m => (cat === "Todas" || m.categoria === cat) && m.nombre.toLowerCase().includes(bus.toLowerCase()));
  const ms = precios.find(m => m.id === sel);
  const stats = { up: precios.filter(m => m.live > m.precioAnt).length, down: precios.filter(m => m.live < m.precioAnt).length, vol: precios.reduce((s, m) => s + m.vendidos * m.live, 0) };

  return (
    <div className="overflow-hidden -mx-4 lg:mx-0" style={{ background: "#0d0a08", border: "1px solid #3a3028", borderRadius: "16px" }}>
      <Estilos />
      <div className="p-4 md:p-6 border-b border-stone-800">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1"><Activity size={16} className="text-emerald-400" /><span className="text-xs font-mono tracking-widest text-emerald-400">MERCADO EN VIVO</span><span className="w-2 h-2 bg-emerald-400 rounded-full pulse-dot"></span></div>
            <h1 className="text-2xl md:text-3xl font-black text-stone-100 font-display">Precios de materias primas</h1>
            <p className="text-stone-500 text-sm mt-1">Monitor en tiempo real · Actualización cada 2 segundos</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div><div className="text-xs text-stone-500">Al alza</div><div className="text-emerald-400 font-bold font-mono flex items-center gap-1"><TrendingUp size={14} /> {stats.up}</div></div>
            <div><div className="text-xs text-stone-500">A la baja</div><div className="text-red-400 font-bold font-mono flex items-center gap-1"><TrendingDown size={14} /> {stats.down}</div></div>
            <div className="hidden md:block"><div className="text-xs text-stone-500">Volumen 24h</div><div className="text-stone-100 font-bold font-mono">{fmtCOP(stats.vol).replace('COP', '').trim()}</div></div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" size={14} /><input type="text" value={bus} onChange={e => setBus(e.target.value)} placeholder="Buscar..." className="w-full pl-9 pr-3 py-2 text-sm focus:outline-none text-stone-100 placeholder:text-stone-500" style={inputStyle} /></div>
          <div className="flex items-center gap-1 flex-wrap">{cats.map(c => (<button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 text-xs font-semibold rounded-lg" style={{ background: cat === c ? "linear-gradient(135deg, #F97316, #EA580C)" : "rgba(0,0,0,0.4)", color: cat === c ? "#1a1612" : "#a8a29e", border: "1px solid " + (cat === c ? "transparent" : "#3a3028") }}>{c}</button>))}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
        <div className="overflow-x-auto max-h-[700px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10" style={{ background: "#1a1612" }}><tr className="text-stone-500 text-xs font-mono"><th className="text-left px-4 py-3 font-normal tracking-wider">MATERIA</th><th className="text-right px-4 py-3 font-normal tracking-wider">PRECIO</th><th className="text-right px-4 py-3 font-normal tracking-wider hidden md:table-cell">CAMBIO</th><th className="text-right px-4 py-3 font-normal tracking-wider hidden lg:table-cell">MÁX</th><th className="text-right px-4 py-3 font-normal tracking-wider hidden lg:table-cell">MÍN</th><th className="text-right px-4 py-3 font-normal tracking-wider">GRÁFICO</th></tr></thead>
            <tbody>
              {filt.map(m => {
                const v = ((m.live - m.precioAnt) / m.precioAnt) * 100; const sub = v > 0;
                const max = Math.max(...m.hist, m.live); const min = Math.min(...m.hist, m.live);
                const fc = m.flash === "g" ? "flash-green" : m.flash === "r" ? "flash-red" : "";
                return (
                  <tr key={m.id} onClick={() => setSel(m.id)} className={`border-t border-stone-800 hover:bg-stone-900/40 cursor-pointer ${fc} ${sel === m.id ? "bg-stone-900/60" : ""}`}>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><span className="text-xl">{m.img}</span><div><div className="font-semibold text-stone-100 text-sm">{m.nombre.split(' ').slice(0, 3).join(' ')}</div><div className="text-[10px] text-stone-500 font-mono uppercase">{m.categoria} · {m.unidad}</div></div></div></td>
                    <td className={`px-4 py-3 text-right font-mono font-bold ${sub ? "text-emerald-400" : "text-red-400"}`}>{fmtCOP(m.live).replace('COP', '').trim()}</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell"><span className="font-mono font-semibold px-2 py-0.5 rounded text-xs" style={{ background: sub ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", color: sub ? "#34D399" : "#F87171" }}>{sub ? "+" : ""}{v.toFixed(2)}%</span></td>
                    <td className="px-4 py-3 text-right font-mono text-stone-400 text-xs hidden lg:table-cell">{fmtCOP(max).replace('COP', '').trim()}</td>
                    <td className="px-4 py-3 text-right font-mono text-stone-400 text-xs hidden lg:table-cell">{fmtCOP(min).replace('COP', '').trim()}</td>
                    <td className="px-4 py-3"><Spark hist={m.hist} sub={sub} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-l border-stone-800 p-5 max-h-[700px] overflow-y-auto" style={{ background: "#1a1612" }}>{ms && <DetMer m={ms} setMatSel={setMatSel} />}</div>
      </div>
    </div>
  );
}

function Spark({ hist, sub }) { const max = Math.max(...hist), min = Math.min(...hist), r = max - min || 1, w = 80, h = 30, st = w / (hist.length - 1); const pts = hist.map((p, i) => `${i * st},${h - ((p - min) / r) * h}`).join(" "); return (<svg width={w} height={h} className="ml-auto"><polyline fill="none" stroke={sub ? "#10b981" : "#ef4444"} strokeWidth="1.5" points={pts} /></svg>); }

function DetMer({ m, setMatSel }) {
  const v = ((m.live - m.precioAnt) / m.precioAnt) * 100; const sub = v > 0;
  const p = provById(m.proveedorId); const max = Math.max(...m.hist, m.live); const min = Math.min(...m.hist, m.live);

  // Predicción de precios (promedio móvil con tendencia)
  const tend = (m.hist.slice(-10).reduce((s, x) => s + x, 0) / 10) - (m.hist.slice(-20, -10).reduce((s, x) => s + x, 0) / 10);
  const pred = Array.from({ length: 15 }, (_, i) => m.live + tend * (i + 1) * 0.8 + (Math.random() - 0.5) * m.live * 0.015);
  const reco = tend > m.live * 0.001 ? { t: "ESPERAR", c: "#F87171", d: "Precio tiende a subir en los próximos días" } : tend < -m.live * 0.001 ? { t: "COMPRAR AHORA", c: "#34D399", d: "Precio en zona baja, oportunidad de compra" } : { t: "NEUTRAL", c: "#FCD34D", d: "Sin tendencia clara a corto plazo" };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4"><div className="text-4xl">{m.img}</div><div><div className="text-[10px] font-mono text-orange-500 tracking-wider uppercase">{m.categoria}</div><div className="font-bold text-stone-100">{m.nombre}</div><div className="text-xs text-stone-500">{p.nombre}</div></div></div>
      <div className="mb-4"><div className={`text-3xl font-black font-mono ${sub ? "text-emerald-400" : "text-red-400"}`}>{fmtCOP(m.live)}</div><div className="flex items-center gap-2 mt-1 text-sm"><span className={`font-mono font-bold flex items-center gap-1 ${sub ? "text-emerald-400" : "text-red-400"}`}>{sub ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{sub ? "+" : ""}{v.toFixed(2)}%</span><span className="text-stone-500 text-xs">24h</span></div></div>
      <BigChart hist={m.hist} sub={sub} prediccion={pred} />

      {/* Recomendación IA */}
      <div className="mt-4 p-3 relative overflow-hidden" style={{ background: `${reco.c}15`, border: `1px solid ${reco.c}40`, borderRadius: "10px" }}>
        <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl" style={{ background: `${reco.c}30` }}></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <Brain size={14} style={{ color: reco.c }} />
            <span className="text-[9px] font-mono tracking-[0.2em] font-bold" style={{ color: reco.c }}>ANÁLISIS IA · 15 DÍAS</span>
          </div>
          <div className="font-black text-lg font-display" style={{ color: reco.c }}>{reco.t}</div>
          <div className="text-xs text-stone-400 mt-1">{reco.d}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4"><Stat lbl="MÁX 24H" val={fmtCOP(max)} /><Stat lbl="MÍN 24H" val={fmtCOP(min)} /><Stat lbl="VOLUMEN" val={fmtN(m.vendidos)} /><Stat lbl="STOCK" val={`${fmtN(m.stock)} ${m.unidad}`} /></div>
      <div className="mt-5 pt-5 border-t border-stone-800">
        <div className="text-[10px] font-mono text-stone-500 tracking-wider uppercase mb-2">Proveedor</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-stone-100 text-sm">{p.nombre}</div>
            <div className="text-xs text-stone-500 flex items-center gap-1"><Star size={10} className="fill-orange-500 text-orange-500" />{p.calificacion} · {p.ciudad}</div>
          </div>
          <div className="flex gap-1">
            {p.certs.map(c => <span key={c} className="text-[9px] font-mono px-1.5 py-0.5 rounded text-stone-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>{c}</span>)}
          </div>
        </div>
      </div>
      <button onClick={() => setMatSel(m)} className="w-full mt-4 text-stone-900 font-bold py-3 rounded-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={orangeBtn}><ShoppingCart size={16} />Comprar ahora</button>
    </div>
  );
}

function Stat({ lbl, val }) { return (<div className="p-3" style={inputStyle}><div className="text-[9px] font-mono text-stone-500 tracking-wider">{lbl}</div><div className="font-mono font-bold text-stone-100 text-sm mt-1">{val}</div></div>); }

function BigChart({ hist, sub, prediccion }) {
  const full = prediccion ? [...hist, ...prediccion] : hist;
  const max = Math.max(...full), min = Math.min(...full), r = max - min || 1, w = 320, h = 120, st = w / (full.length - 1);
  const ptsHist = hist.map((p, i) => ({ x: i * st, y: h - ((p - min) / r) * h }));
  const plHist = ptsHist.map(p => `${p.x},${p.y}`).join(" ");
  const ar = `${ptsHist.map(p => `${p.x},${p.y}`).join(" L ")} L ${(hist.length - 1) * st},${h} L 0,${h} Z`;
  const c = sub ? "#10b981" : "#ef4444";

  let ptsPred = [], plPred = "";
  if (prediccion) {
    ptsPred = prediccion.map((p, i) => ({ x: (hist.length - 1 + i) * st, y: h - ((p - min) / r) * h }));
    plPred = ptsPred.map(p => `${p.x},${p.y}`).join(" ");
  }

  return (
    <div className="p-3" style={inputStyle}>
      <svg width="100%" viewBox={`0 0 ${w} ${h + 15}`}>
        <defs>
          <linearGradient id={`g-${sub}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={c} stopOpacity="0.4" /><stop offset="100%" stopColor={c} stopOpacity="0" /></linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map(p => <line key={p} x1="0" y1={h * p} x2={w} y2={h * p} stroke="#3a3028" strokeDasharray="2,2" />)}
        <path d={`M ${ar}`} fill={`url(#g-${sub})`} />
        <polyline fill="none" stroke={c} strokeWidth="2" points={plHist} />
        {prediccion && (
          <>
            {/* Línea divisoria */}
            <line x1={(hist.length - 1) * st} y1="0" x2={(hist.length - 1) * st} y2={h} stroke="#F97316" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
            <text x={(hist.length - 1) * st + 4} y="10" fill="#F97316" fontSize="8" fontFamily="JetBrains Mono">PREDICCIÓN →</text>
            {/* Línea de predicción punteada */}
            <polyline fill="none" stroke="#F97316" strokeWidth="2" strokeDasharray="4,3" points={plPred} />
            {/* Puntos de predicción */}
            {ptsPred.filter((_, i) => i % 3 === 0).map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill="#F97316" />)}
          </>
        )}
      </svg>
    </div>
  );
}

function ModalDetalle({ materia, onClose, addCart, favs, togFav }) {
  const [c, setC] = useState(materia.minOrden);
  const p = provById(materia.proveedorId);
  const v = ((materia.precio - materia.precioAnt) / materia.precioAnt) * 100; const sub = v > 0;
  const ef = favs.includes(materia.id);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "16px" }} onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 px-6 py-4 flex items-center justify-between z-10 border-b border-stone-800" style={{ background: "#1a1612" }}><div className="text-xs font-mono text-stone-500">#{String(materia.id).padStart(4, "0")}</div><button onClick={onClose} className="w-9 h-9 rounded-full hover:bg-stone-800 flex items-center justify-center text-stone-300"><X size={18} /></button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div>
            <div className="aspect-square flex items-center justify-center text-[10rem] mb-3" style={{ background: "linear-gradient(135deg, #2a2018, #0d0a08)", border: "1px solid #3a3028", borderRadius: "16px" }}>{materia.img}</div>
            <button onClick={() => togFav(materia.id)} className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-orange-500"><Heart size={16} className={ef ? "fill-orange-500 text-orange-500" : ""} />{ef ? "Guardado" : "Guardar"}</button>
          </div>
          <div>
            <div className="text-[10px] font-mono text-orange-500 tracking-[0.2em] uppercase mb-2">{materia.categoria}</div>
            <h2 className="text-3xl font-black text-stone-100 leading-tight mb-3 font-display">{materia.nombre}</h2>
            <div className="flex items-center gap-3 mb-4 text-sm"><div className="flex items-center gap-1"><Star size={14} className="fill-orange-500 text-orange-500" /><span className="font-semibold text-stone-200">{p.calificacion}</span></div><span className="text-stone-600">|</span><span className="text-stone-400">{materia.vendidos} vendidos</span></div>
            <div className="border-y border-stone-800 py-4 my-4">
              <div className="flex items-baseline gap-2"><div className="text-4xl font-black text-stone-100 font-display">{fmtCOP(materia.precio)}</div><div className="text-sm text-stone-500">/ {materia.unidad}</div></div>
              <div className="inline-flex items-center gap-1 mt-2 text-xs font-bold px-2 py-1 rounded" style={{ background: sub ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)", color: sub ? "#F87171" : "#34D399" }}>{sub ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{sub ? "+" : ""}{v.toFixed(2)}% vs semana anterior</div>
            </div>
            <p className="text-sm text-stone-400 mb-4 leading-relaxed">{materia.desc}</p>
            <div className="space-y-2 text-sm mb-5"><Row l="Stock" v={`${fmtN(materia.stock)} ${materia.unidad}`} /><Row l="Orden mínima" v={`${materia.minOrden} ${materia.unidad}`} /><Row l="Proveedor" v={p.nombre} /><Row l="Ubicación" v={p.ciudad} /></div>
            <div className="flex flex-wrap gap-1 mb-5">{p.certs.map(x => <span key={x} className="text-[10px] font-mono text-stone-400 px-2 py-1 rounded" style={inputStyle}><Shield size={10} className="inline mr-1" />{x}</span>)}</div>
            <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "12px" }}>
              <div className="text-xs text-stone-500 font-semibold mb-2">Cantidad</div>
              <div className="flex items-center gap-2 mb-3">
                <button onClick={() => setC(Math.max(materia.minOrden, c - materia.minOrden))} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-stone-800 text-stone-300" style={{ border: "1px solid #3a3028" }}><Minus size={14} /></button>
                <input type="number" value={c} onChange={e => setC(Math.max(materia.minOrden, parseInt(e.target.value) || materia.minOrden))} className="flex-1 h-10 text-center font-mono font-bold text-stone-100 focus:outline-none" style={inputStyle} />
                <button onClick={() => setC(c + materia.minOrden)} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-stone-800 text-stone-300" style={{ border: "1px solid #3a3028" }}><Plus size={14} /></button>
              </div>
              <div className="flex items-center justify-between text-sm mb-3"><span className="text-stone-400">Subtotal</span><span className="font-black text-xl text-stone-100">{fmtCOP(c * materia.precio)}</span></div>
              <button onClick={() => { addCart(materia, c); onClose(); }} className="w-full text-stone-900 font-bold py-3 rounded-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={orangeBtn}><ShoppingCart size={16} />Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ l, v }) { return (<div className="flex items-center justify-between text-sm border-b border-stone-800 pb-1.5"><span className="text-stone-500">{l}</span><span className="font-medium text-stone-200">{v}</span></div>); }

function PanelCarrito({ carrito, total, onClose, updQty, confirmarPedido }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="fixed inset-0" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} />
      <div className="relative w-full max-w-md h-full flex flex-col slide-in" style={{ background: "#1a1612", borderLeft: "1px solid #3a3028" }} onClick={e => e.stopPropagation()}>
        <div className="text-stone-900 p-6 grain relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
          <div className="relative">
            <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><ShoppingCart size={18} /><span className="font-mono text-xs tracking-wider font-bold">CARRITO</span></div><button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-900/20 flex items-center justify-center"><X size={16} /></button></div>
            <div className="text-2xl font-black font-display">{carrito.length} {carrito.length === 1 ? "producto" : "productos"}</div>
          </div>
        </div>
        {carrito.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center p-8 text-center"><ShoppingCart size={56} className="text-stone-700 mb-4" /><h3 className="text-lg font-bold text-stone-300 mb-1">Tu carrito está vacío</h3></div>) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">{carrito.map(it => (
              <div key={it.id} className="p-3 flex gap-3" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "12px" }}>
                <div className="w-16 h-16 flex items-center justify-center text-4xl flex-shrink-0 rounded-lg" style={{ background: "rgba(0,0,0,0.4)" }}>{it.img}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-mono text-orange-500 uppercase">{it.categoria}</div>
                  <div className="text-sm font-semibold text-stone-100 line-clamp-1">{it.nombre}</div>
                  <div className="text-xs text-stone-500">{fmtCOP(it.precio)} / {it.unidad}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <button onClick={() => updQty(it.id, it.cantidad - it.minOrden)} className="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}><Minus size={12} /></button>
                      <div className="w-12 h-7 rounded flex items-center justify-center font-mono text-xs font-bold text-stone-200" style={inputStyle}>{it.cantidad}</div>
                      <button onClick={() => updQty(it.id, it.cantidad + it.minOrden)} className="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}><Plus size={12} /></button>
                    </div>
                    <div className="font-bold text-sm text-stone-100">{fmtCOP(it.cantidad * it.precio)}</div>
                  </div>
                </div>
              </div>
            ))}</div>
            <div className="p-4 space-y-3" style={{ background: "#1a1612", borderTop: "1px solid #3a3028" }}>
              <div className="flex items-center justify-between text-sm"><span className="text-stone-400">Subtotal</span><span className="font-semibold text-stone-200">{fmtCOP(total)}</span></div>
              <div className="flex items-center justify-between text-sm"><span className="text-stone-400">Envío</span><span className="font-semibold text-emerald-400">GRATIS</span></div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-800"><span className="font-bold text-stone-100">Total</span><span className="text-2xl font-black text-stone-100 font-display">{fmtCOP(total)}</span></div>
              <button onClick={confirmarPedido} className="w-full text-stone-900 font-bold py-3.5 rounded-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2" style={orangeBtn}>Finalizar compra <ChevronRight size={16} /></button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Kpi({ icon: Ic, lbl, val, accent, alert, small }) {
  const colors = { o: "#F97316", e: "#10B981", r: "#EF4444", s: "#475569" };
  return (
    <div className="p-4 relative overflow-hidden" style={{ background: alert ? "linear-gradient(135deg, #2a1a18, #1a1612)" : "linear-gradient(135deg, #2a2018, #1a1612)", border: `1px solid ${alert ? "rgba(239, 68, 68, 0.3)" : "#3a3028"}`, borderRadius: "12px" }}>
      {alert && <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full pulse-dot"></div>}
      <div className="flex items-center gap-2 mb-2"><Ic size={14} style={{ color: colors[accent] }} /><div className="text-xs text-stone-400 font-semibold">{lbl}</div></div>
      <div className={`font-black text-stone-100 font-display ${small ? "text-xl" : "text-3xl"}`}>{val}</div>
    </div>
  );
}

function Inventario({ inventario, regUso, ajustarMin, elim, ir }) {
  const [modUso, setModUso] = useState(null);
  const [modAj, setModAj] = useState(null);
  const tot = inventario.reduce((s, i) => s + i.cantidadActual * i.precio, 0);
  const bajos = inventario.filter(i => i.cantidadActual <= i.stockMin).length;
  const ok = inventario.filter(i => i.cantidadActual > i.stockMin).length;

  return (
    <div>
      <div className="mb-6"><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Mi Inventario</h1><p className="text-stone-500">Gestiona tus materias primas en stock</p></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"><Kpi icon={Package} lbl="Referencias" val={inventario.length} accent="o" /><Kpi icon={DollarSign} lbl="Valor total" val={fmtCOP(tot)} accent="o" small /><Kpi icon={Check} lbl="Stock óptimo" val={ok} accent="e" /><Kpi icon={AlertCircle} lbl="Reposición" val={bajos} accent="r" alert={bajos > 0} /></div>
      {inventario.length === 0 ? (
        <div className="p-16 text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px dashed #3a3028", borderRadius: "16px" }}>
          <Boxes size={56} className="mx-auto text-stone-600 mb-4" />
          <h3 className="text-xl font-bold text-stone-200 mb-2">Tu inventario está vacío</h3>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">Cuando realices una compra, las materias primas se registrarán automáticamente aquí.</p>
          <button onClick={ir} className="text-stone-900 font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all" style={orangeBtn}>Ir al marketplace <ChevronRight size={16} /></button>
        </div>
      ) : (
        <div className="overflow-hidden" style={card}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: "rgba(0,0,0,0.4)" }}><tr>{["Producto", "Cantidad", "Stock mín.", "Estado", "Valor", "Acciones"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-400 uppercase tracking-wider">{h}</th>)}</tr></thead>
              <tbody>
                {inventario.map(it => {
                  const bajo = it.cantidadActual <= it.stockMin; const ago = it.cantidadActual === 0;
                  return (
                    <tr key={it.id} className="border-t border-stone-800 hover:bg-stone-900/30">
                      <td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: "rgba(0,0,0,0.4)" }}>{it.img}</div><div><div className="font-semibold text-sm text-stone-100">{it.nombre}</div><div className="text-[10px] font-mono text-orange-500 uppercase tracking-wider">{it.categoria}</div></div></div></td>
                      <td className="px-4 py-3"><div className="font-black text-lg text-stone-100">{fmtN(it.cantidadActual)}</div><div className="text-xs text-stone-500">{it.unidad}</div></td>
                      <td className="px-4 py-3"><button onClick={() => setModAj(it)} className="text-sm text-stone-300 hover:text-orange-400 flex items-center gap-1"><Edit size={12} />{it.stockMin} {it.unidad}</button></td>
                      <td className="px-4 py-3">{ago ? (<span className="inline-flex items-center gap-1 text-stone-100 px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)" }}><span className="w-1.5 h-1.5 bg-white rounded-full pulse-dot"></span>AGOTADO</span>) : bajo ? (<span className="inline-flex items-center gap-1 text-amber-300 px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.3)" }}><AlertCircle size={10} /> STOCK BAJO</span>) : (<span className="inline-flex items-center gap-1 text-emerald-300 px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)" }}><Check size={10} /> ÓPTIMO</span>)}</td>
                      <td className="px-4 py-3 font-mono font-semibold text-sm text-stone-200">{fmtCOP(it.cantidadActual * it.precio)}</td>
                      <td className="px-4 py-3"><div className="flex items-center gap-1"><button onClick={() => setModUso(it)} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-orange-400" style={inputStyle}><Minus size={14} /></button><button onClick={() => elim(it.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-red-400" style={inputStyle}><Trash2 size={14} /></button></div></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {modUso && <ModalUso it={modUso} onClose={() => setModUso(null)} onConf={c => { regUso(modUso.id, c); setModUso(null); }} />}
      {modAj && <ModalAj it={modAj} onClose={() => setModAj(null)} onConf={v => { ajustarMin(modAj.id, v); setModAj(null); }} />}
    </div>
  );
}

function ModalUso({ it, onClose, onConf }) {
  const [c, setC] = useState(1); const inv = c > it.cantidadActual || c <= 0;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-md w-full overflow-hidden" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "16px" }} onClick={e => e.stopPropagation()}>
        <div className="text-stone-900 p-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><div><div className="text-xs font-mono tracking-wider font-bold">REGISTRAR USO</div><div className="font-bold text-lg">{it.nombre}</div></div><button onClick={onClose}><X size={20} /></button></div>
        <div className="p-6 space-y-4">
          <div><div className="text-xs text-stone-500 font-semibold mb-1">Disponible</div><div className="font-black text-3xl text-stone-100">{fmtN(it.cantidadActual)} <span className="text-base text-stone-500 font-normal">{it.unidad}</span></div></div>
          <div><label className="text-xs text-stone-500 font-semibold block mb-2">Cantidad a consumir</label><input type="number" value={c} onChange={e => setC(Math.max(0, parseInt(e.target.value) || 0))} max={it.cantidadActual} min={0} className="w-full p-3 font-mono font-bold text-xl text-stone-100 focus:outline-none" style={inputStyle} /></div>
          {inv && c > 0 && <div className="flex items-center gap-2 text-red-300 text-sm p-3 rounded-lg" style={{ background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)" }}><AlertCircle size={14} />Cantidad mayor al stock disponible</div>}
          <div className="flex gap-2 pt-2"><button onClick={onClose} className="flex-1 py-3 rounded-lg font-semibold text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}>Cancelar</button><button onClick={() => onConf(c)} disabled={inv} className="flex-1 text-stone-900 py-3 rounded-lg font-bold disabled:opacity-40" style={orangeBtn}>Registrar</button></div>
        </div>
      </div>
    </div>
  );
}

function ModalAj({ it, onClose, onConf }) {
  const [v, setV] = useState(it.stockMin);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-md w-full overflow-hidden" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "16px" }} onClick={e => e.stopPropagation()}>
        <div className="text-stone-900 p-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><div><div className="text-xs font-mono tracking-wider font-bold">STOCK MÍNIMO</div><div className="font-bold text-lg">{it.nombre}</div></div><button onClick={onClose}><X size={20} /></button></div>
        <div className="p-6 space-y-4">
          <p className="text-sm text-stone-400">Define el umbral para alertas de reposición.</p>
          <div><label className="text-xs text-stone-500 font-semibold block mb-2">Nuevo umbral ({it.unidad})</label><input type="number" value={v} onChange={e => setV(Math.max(0, parseInt(e.target.value) || 0))} min={0} className="w-full p-3 font-mono font-bold text-xl text-stone-100 focus:outline-none" style={inputStyle} /></div>
          <div className="flex gap-2 pt-2"><button onClick={onClose} className="flex-1 py-3 rounded-lg font-semibold text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}>Cancelar</button><button onClick={() => onConf(v)} className="flex-1 text-stone-900 py-3 rounded-lg font-bold" style={orangeBtn}>Guardar</button></div>
        </div>
      </div>
    </div>
  );
}

function Pedidos({ pedidos, ir }) {
  return (
    <div>
      <div className="mb-6"><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Mis Pedidos</h1><p className="text-stone-500">Historial y trazabilidad de tus compras</p></div>
      {pedidos.length === 0 ? (
        <div className="p-16 text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px dashed #3a3028", borderRadius: "16px" }}>
          <Truck size={56} className="mx-auto text-stone-600 mb-4" />
          <h3 className="text-xl font-bold text-stone-200 mb-2">Sin pedidos aún</h3>
          <button onClick={ir} className="text-stone-900 font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all" style={orangeBtn}>Explorar marketplace <ChevronRight size={16} /></button>
        </div>
      ) : (
        <div className="space-y-4">{pedidos.map(p => (
          <div key={p.id} className="overflow-hidden" style={card}>
            <div className="p-4 flex items-center justify-between flex-wrap gap-3" style={{ background: "rgba(0,0,0,0.3)", borderBottom: "1px solid #3a3028" }}>
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center text-emerald-400" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}><Check size={18} strokeWidth={3} /></div><div><div className="text-xs text-stone-500">Pedido</div><div className="font-black text-stone-100 font-mono">{p.id}</div></div></div>
              <div className="text-right"><div className="text-xs text-stone-500">{p.fecha}</div><div className="font-black text-xl text-stone-100 font-display">{fmtCOP(p.total)}</div></div>
            </div>
            <div className="p-4 divide-y divide-stone-800">{p.items.map(it => (<div key={it.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: "rgba(0,0,0,0.4)" }}>{it.img}</div><div><div className="font-semibold text-sm text-stone-100">{it.nombre}</div><div className="text-xs text-stone-500">{it.cantidad} {it.unidad} × {fmtCOP(it.precio)}</div></div></div><div className="font-bold text-sm text-stone-100">{fmtCOP(it.cantidad * it.precio)}</div></div>))}</div>
          </div>
        ))}</div>
      )}
    </div>
  );
}

function Analitica({ inventario, pedidos }) {
  const inv = pedidos.reduce((s, p) => s + p.total, 0);
  const val = inventario.reduce((s, i) => s + i.cantidadActual * i.precio, 0);
  const cd = useMemo(() => { const m = {}; inventario.forEach(i => { m[i.categoria] = (m[i.categoria] || 0) + i.cantidadActual * i.precio; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); }, [inventario]);
  const max = Math.max(...cd.map(c => c[1]), 1);

  return (
    <div>
      <div className="mb-6"><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Analítica y P&L</h1><p className="text-stone-500">Análisis de adquisiciones y consumo</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><Kpi icon={DollarSign} lbl="Total invertido" val={fmtCOP(inv)} accent="o" small /><Kpi icon={Warehouse} lbl="Valor inventario" val={fmtCOP(val)} accent="o" small /><Kpi icon={Truck} lbl="Pedidos" val={pedidos.length} accent="e" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="overflow-hidden" style={card}><div className="p-4 border-b border-stone-800"><h3 className="font-black text-stone-100">Inventario por categoría</h3></div><div className="p-4">{cd.length === 0 ? <p className="text-stone-500 text-sm py-8 text-center">Sin datos aún.</p> : <div className="space-y-3">{cd.map(([c, v], i) => (<div key={c}><div className="flex items-center justify-between mb-1"><span className="text-xs font-semibold text-stone-300">{c}</span><span className="font-mono text-xs font-bold text-stone-200">{fmtCOP(v)}</span></div><div className="h-6 rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.4)" }}><div className="h-full" style={{ width: `${(v / max) * 100}%`, background: i === 0 ? "linear-gradient(90deg, #F97316, #EA580C)" : "linear-gradient(90deg, #475569, #1e293b)" }}></div></div></div>))}</div>}</div></div>
        <div className="overflow-hidden" style={card}><div className="p-4 border-b border-stone-800"><h3 className="font-black text-stone-100">Variación de precios</h3></div><div className="p-4"><div className="space-y-2">{materias.slice(0, 6).map(m => { const v = ((m.precio - m.precioAnt) / m.precioAnt) * 100; const sub = v > 0; return (<div key={m.id} className="flex items-center justify-between py-2 border-b border-stone-800 last:border-0"><div className="flex items-center gap-2 min-w-0"><span className="text-xl">{m.img}</span><span className="text-sm font-medium truncate text-stone-200">{m.nombre}</span></div><div className={`flex items-center gap-1 font-mono text-xs font-bold ${sub ? "text-red-400" : "text-emerald-400"}`}>{sub ? <TrendingUp size={12} /> : <TrendingDown size={12} />}{sub ? "+" : ""}{v.toFixed(2)}%</div></div>); })}</div></div></div>
        <div className="overflow-hidden lg:col-span-2" style={card}><div className="p-4 border-b border-stone-800"><h3 className="font-black text-stone-100 flex items-center gap-2"><AlertCircle size={16} className="text-red-400" />Reposición sugerida</h3></div><div className="p-4">{inventario.filter(i => i.cantidadActual <= i.stockMin).length === 0 ? (<div className="text-center py-8"><div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-400" style={{ background: "rgba(16, 185, 129, 0.1)" }}><Check size={24} strokeWidth={3} /></div><p className="text-stone-400 text-sm">Todos los niveles están en rango óptimo</p></div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-3">{inventario.filter(i => i.cantidadActual <= i.stockMin).map(i => (<div key={i.id} className="p-3 flex items-center gap-3" style={{ background: "rgba(239, 68, 68, 0.08)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px" }}><div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: "rgba(0,0,0,0.4)" }}>{i.img}</div><div className="flex-1 min-w-0"><div className="font-semibold text-sm text-stone-100">{i.nombre}</div><div className="text-xs text-red-300 font-mono">{i.cantidadActual} {i.unidad} · umbral {i.stockMin}</div></div></div>))}</div>)}</div></div>
      </div>
    </div>
  );
}

function ProveedorApp({ onVolver, misProductos, setMisProductos, showToast, toast }) {
  const [vista, setVista] = useState("dashboard");
  const [modProd, setModProd] = useState(null);
  const tot = misProductos.reduce((s, p) => s + p.vendidos * p.precio, 0);
  const act = misProductos.filter(p => p.activo).length;
  const stock = misProductos.reduce((s, p) => s + p.stock, 0);
  const peds = [
    { id: "PED-7821", emp: "Confecciones El Valle", prod: "Poliéster Virgen 75D", cant: 250, total: 4625000, fecha: "15 abr 2026", est: "Pendiente" },
    { id: "PED-7820", emp: "Textiles Andina SAS", prod: "Hilo Algodón Mercerizado", cant: 80, total: 2560000, fecha: "14 abr 2026", est: "Enviado" },
    { id: "PED-7818", emp: "Moda Urbana Ltda.", prod: "Poliéster Virgen 75D", cant: 120, total: 2220000, fecha: "13 abr 2026", est: "Entregado" },
  ];
  const guardar = (p) => { if (p.id) { setMisProductos(prev => prev.map(x => x.id === p.id ? p : x)); showToast("Actualizado"); } else { setMisProductos(prev => [...prev, { ...p, id: Date.now(), vendidos: 0, activo: true }]); showToast("Publicado"); } setModProd(null); };
  const elim = (id) => { setMisProductos(prev => prev.filter(p => p.id !== id)); showToast("Eliminado"); };

  return (
    <div className="min-h-screen text-stone-100" style={{ fontFamily: "'Inter', sans-serif", background: "#1A1612" }}>
      <Estilos />
      {toast && <Toast msg={toast} />}
      <header className="sticky top-0 z-40 border-b border-stone-800/80" style={{ background: "rgba(26, 22, 18, 0.95)", backdropFilter: "blur(12px)" }}>
        <div className="border-b border-stone-800/60" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="max-w-[1600px] mx-auto px-4 lg:px-8 py-2 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-1.5"><Warehouse size={11} className="text-emerald-400" />Panel proveedor · <span className="text-stone-200 font-medium">Textiles del Valle S.A.</span></span>
            <button onClick={onVolver} className="hover:text-emerald-400 flex items-center gap-1"><User size={11} /> Cambiar perfil</button>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-8 py-4">
            <div className="flex items-center gap-2"><LogoIcon size={42} /><div><RawlinkText size={22} light /><div className="text-[9px] text-emerald-500 leading-none mt-1 font-mono tracking-[0.2em]">PANEL PROVEEDOR</div></div></div>
            <nav className="flex items-center gap-1 ml-auto overflow-x-auto">{[{ id: "dashboard", label: "Dashboard", icon: Grid3x3 }, { id: "productos", label: "Mis Productos", icon: Package }, { id: "pedidos", label: "Pedidos", icon: Truck }, { id: "analitica", label: "Analítica", icon: BarChart3 }].map(it => { const Ic = it.icon; const a = vista === it.id; return (<button key={it.id} onClick={() => setVista(it.id)} className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-medium whitespace-nowrap rounded-md" style={{ color: a ? "#10B981" : "#a8a29e", background: a ? "rgba(16, 185, 129, 0.08)" : "transparent" }}><Ic size={14} />{it.label}</button>); })}</nav>
          </div>
        </div>
      </header>
      <main className="max-w-[1600px] mx-auto px-4 lg:px-8 py-6">
        {vista === "dashboard" && (
          <div>
            <div className="mb-6"><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Bienvenido de vuelta</h1><p className="text-stone-500">Resumen de tu operación</p></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"><Kpi icon={DollarSign} lbl="Ventas" val={fmtCOP(tot)} accent="e" small /><Kpi icon={Package} lbl="Productos activos" val={act} accent="o" /><Kpi icon={Warehouse} lbl="Stock total" val={fmtN(stock)} accent="o" /><Kpi icon={Truck} lbl="Pedidos nuevos" val={peds.filter(p => p.est === "Pendiente").length} accent="r" alert /></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="text-stone-100 p-6 lg:col-span-2 relative overflow-hidden grain" style={{ background: "linear-gradient(135deg, #10B981, #059669)", borderRadius: "16px" }}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -translate-y-8 translate-x-8"></div>
                <div className="relative"><h3 className="text-2xl font-black mb-2 font-display">Publica un nuevo producto</h3><p className="text-emerald-50 mb-4 max-w-md">Alcanza a miles de empresas industriales.</p><button onClick={() => setModProd({})} className="bg-white text-emerald-700 font-bold px-5 py-2.5 rounded-lg hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"><Plus size={16} strokeWidth={3} />Nuevo producto</button></div>
              </div>
              <div className="p-6" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "16px" }}>
                <div className="flex items-center gap-2 mb-3"><Star size={18} className="fill-orange-500 text-orange-500" /><h3 className="font-black text-stone-100">Tu calificación</h3></div>
                <div className="text-5xl font-black text-stone-100 font-display">4.8</div>
                <div className="flex gap-0.5 mt-1 mb-3">{[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className={s <= 4 ? "fill-orange-500 text-orange-500" : "text-stone-700"} />)}</div>
                <div className="text-sm text-stone-400">Basado en 124 reseñas</div>
              </div>
            </div>
          </div>
        )}
        {vista === "productos" && (
          <div>
            <div className="flex items-center justify-between mb-6"><div><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Mis Productos</h1></div><button onClick={() => setModProd({})} className="text-stone-900 font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}><Plus size={16} strokeWidth={3} />Nuevo producto</button></div>
            <div className="overflow-hidden" style={card}><div className="overflow-x-auto"><table className="w-full"><thead style={{ background: "rgba(0,0,0,0.4)" }}><tr>{["Producto", "Categoría", "Precio", "Stock", "Vendidos", "Estado", "Acciones"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-stone-400 uppercase tracking-wider">{h}</th>)}</tr></thead><tbody>{misProductos.map(p => (<tr key={p.id} className="border-t border-stone-800 hover:bg-stone-900/30"><td className="px-4 py-3"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ background: "rgba(0,0,0,0.4)" }}>{p.img}</div><div className="font-semibold text-sm text-stone-100">{p.nombre}</div></div></td><td className="px-4 py-3 text-sm text-stone-300">{p.categoria}</td><td className="px-4 py-3 font-mono font-semibold text-sm text-stone-200">{fmtCOP(p.precio)}</td><td className="px-4 py-3 font-mono text-sm text-stone-300">{fmtN(p.stock)} {p.unidad}</td><td className="px-4 py-3 font-mono text-sm text-stone-300">{p.vendidos}</td><td className="px-4 py-3"><span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: p.activo ? "rgba(16, 185, 129, 0.15)" : "rgba(0,0,0,0.4)", color: p.activo ? "#6EE7B7" : "#a8a29e", border: p.activo ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid #3a3028" }}>{p.activo ? "ACTIVO" : "INACTIVO"}</span></td><td className="px-4 py-3"><div className="flex items-center gap-1"><button onClick={() => setModProd(p)} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-emerald-400" style={inputStyle}><Edit size={14} /></button><button onClick={() => elim(p.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-red-400" style={inputStyle}><Trash2 size={14} /></button></div></td></tr>))}</tbody></table></div></div>
          </div>
        )}
        {vista === "pedidos" && (
          <div>
            <div className="mb-6"><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Pedidos recibidos</h1></div>
            <div className="space-y-3">{peds.map(p => (
              <div key={p.id} className="p-5" style={card}>
                <div className="flex items-center justify-between flex-wrap gap-3 mb-3">
                  <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg flex items-center justify-center text-emerald-400" style={{ background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)" }}><Truck size={18} /></div><div><div className="font-mono text-xs text-stone-500">{p.id}</div><div className="font-black text-stone-100">{p.emp}</div></div></div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: p.est === "Pendiente" ? "rgba(245, 158, 11, 0.15)" : p.est === "Enviado" ? "rgba(59, 130, 246, 0.15)" : "rgba(16, 185, 129, 0.15)", color: p.est === "Pendiente" ? "#FCD34D" : p.est === "Enviado" ? "#93C5FD" : "#6EE7B7" }}>{p.est.toUpperCase()}</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm"><div><div className="text-xs text-stone-500">Producto</div><div className="font-semibold text-stone-200">{p.prod}</div></div><div><div className="text-xs text-stone-500">Cantidad</div><div className="font-semibold font-mono text-stone-200">{p.cant}</div></div><div><div className="text-xs text-stone-500">Fecha</div><div className="font-semibold text-stone-200">{p.fecha}</div></div><div><div className="text-xs text-stone-500">Total</div><div className="font-black text-emerald-400">{fmtCOP(p.total)}</div></div></div>
              </div>
            ))}</div>
          </div>
        )}
        {vista === "analitica" && (
          <div>
            <div className="mb-6"><h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Analítica de ventas</h1><p className="text-stone-500">Rendimiento financiero y operacional</p></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"><Kpi icon={DollarSign} lbl="Ingresos" val={fmtCOP(tot)} accent="e" small /><Kpi icon={Truck} lbl="Pedidos" val={peds.length} accent="o" /><Kpi icon={TrendingUp} lbl="Crecimiento" val="+18.2%" accent="e" small /><Kpi icon={Star} lbl="Calificación" val="4.8" accent="o" /></div>

            {/* Gráficos mensuales */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <GraficoVentasMensuales />
              <GraficoPedidosMensuales />
            </div>

            {/* Ventas por cliente por mes */}
            <div className="mb-6">
              <GraficoVentasPorCliente />
            </div>

            {/* Análisis de ganancias netas */}
            <div className="mb-6">
              <GraficoGananciasNetas />
            </div>

            <div className="p-5" style={card}><h3 className="font-black text-stone-100 mb-4">Ventas por producto</h3><div className="space-y-4">{misProductos.map(p => { const ven = p.vendidos * p.precio; const max = Math.max(...misProductos.map(x => x.vendidos * x.precio)); return (<div key={p.id}><div className="flex items-center justify-between mb-1 text-sm"><span className="font-semibold text-stone-200">{p.nombre}</span><span className="font-mono font-bold text-stone-100">{fmtCOP(ven)}</span></div><div className="h-5 rounded-lg overflow-hidden" style={{ background: "rgba(0,0,0,0.4)" }}><div className="h-full rounded-lg" style={{ width: `${(ven / max) * 100}%`, background: "linear-gradient(90deg, #10B981, #059669)" }}></div></div></div>); })}</div></div>
          </div>
        )}
      </main>
      {modProd && <ModalProd p={modProd} onClose={() => setModProd(null)} onSave={guardar} />}
    </div>
  );
}

function ModalProd({ p, onClose, onSave }) {
  const [f, setF] = useState({ id: p.id || null, nombre: p.nombre || "", categoria: p.categoria || "Textiles", precio: p.precio || 0, stock: p.stock || 0, unidad: p.unidad || "kg", img: p.img || "📦", activo: p.activo !== undefined ? p.activo : true, vendidos: p.vendidos || 0 });
  const ems = ["🧵", "🧶", "⚗️", "🔬", "🧪", "💧", "⬜", "🟠", "🟤", "⚫", "⚪", "👖", "📦"];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-lg w-full max-h-[90vh] overflow-y-auto" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "16px" }} onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 text-stone-900 p-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}><div><div className="text-xs font-mono tracking-wider opacity-80">{f.id ? "EDITAR" : "NUEVO"} PRODUCTO</div><div className="font-black text-xl">{f.id ? f.nombre : "Publicar producto"}</div></div><button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-900/20 flex items-center justify-center"><X size={18} /></button></div>
        <div className="p-6 space-y-4">
          <div><label className="text-xs font-semibold text-stone-400 block mb-1">Nombre</label><input type="text" value={f.nombre} onChange={e => setF({ ...f, nombre: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none" placeholder="Ej: Algodón peinado 30/1" style={inputStyle} /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="text-xs font-semibold text-stone-400 block mb-1">Categoría</label><select value={f.categoria} onChange={e => setF({ ...f, categoria: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none" style={inputStyle}>{["Textiles", "Polímeros", "Químicos", "Metales", "Cueros"].map(c => <option key={c}>{c}</option>)}</select></div><div><label className="text-xs font-semibold text-stone-400 block mb-1">Unidad</label><select value={f.unidad} onChange={e => setF({ ...f, unidad: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none" style={inputStyle}>{["kg", "g", "L", "ml", "m", "m²"].map(u => <option key={u}>{u}</option>)}</select></div></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="text-xs font-semibold text-stone-400 block mb-1">Precio (COP)</label><input type="number" value={f.precio} onChange={e => setF({ ...f, precio: parseInt(e.target.value) || 0 })} className="w-full p-2.5 font-mono text-stone-100 focus:outline-none" style={inputStyle} /></div><div><label className="text-xs font-semibold text-stone-400 block mb-1">Stock</label><input type="number" value={f.stock} onChange={e => setF({ ...f, stock: parseInt(e.target.value) || 0 })} className="w-full p-2.5 font-mono text-stone-100 focus:outline-none" style={inputStyle} /></div></div>
          <div><label className="text-xs font-semibold text-stone-400 block mb-2">Icono</label><div className="flex flex-wrap gap-2">{ems.map(e => (<button key={e} onClick={() => setF({ ...f, img: e })} className="w-10 h-10 rounded-lg text-xl" style={{ background: f.img === e ? "rgba(16, 185, 129, 0.15)" : "rgba(0,0,0,0.4)", border: `2px solid ${f.img === e ? "#10B981" : "transparent"}` }}>{e}</button>))}</div></div>
          <label className="flex items-center gap-2 text-sm text-stone-300"><input type="checkbox" checked={f.activo} onChange={e => setF({ ...f, activo: e.target.checked })} className="accent-emerald-500" /><span>Producto activo</span></label>
          <div className="flex gap-2 pt-2"><button onClick={onClose} className="flex-1 py-3 rounded-lg font-semibold text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}>Cancelar</button><button onClick={() => onSave(f)} disabled={!f.nombre || f.precio <= 0} className="flex-1 text-stone-900 py-3 rounded-lg font-bold disabled:opacity-40" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>{f.id ? "Guardar" : "Publicar"}</button></div>
        </div>
      </div>
    </div>
  );
}

// ============ SPLASH SCREEN ============
function SplashScreen({ onDone }) {
  const [fase, setFase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setFase(1), 500);
    const t2 = setTimeout(() => setFase(2), 1400);
    const t3 = setTimeout(() => onDone(), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden" style={{ background: "#1A1612" }}>
      <Estilos />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(249, 115, 22, 0.2) 0%, transparent 60%)" }}></div>
      <div className="absolute inset-0 grain"></div>
      <style>{`
        @keyframes ringIn1 { 0% { opacity: 0; transform: rotate(-90deg) scale(0.3); } 100% { opacity: 1; transform: rotate(-25deg) scale(1); } }
        @keyframes ringIn2 { 0% { opacity: 0; transform: rotate(90deg) scale(0.3); } 100% { opacity: 1; transform: rotate(25deg) scale(1); } }
        @keyframes textFade { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes containerPulse { 0%, 100% { box-shadow: 0 0 60px rgba(249, 115, 22, 0.3); } 50% { box-shadow: 0 0 120px rgba(249, 115, 22, 0.6); } }
        @keyframes exitFade { 0% { opacity: 1; } 100% { opacity: 0; transform: scale(1.1); } }
        .splash-exit { animation: exitFade 0.8s ease-in forwards; }
      `}</style>
      <div className={`relative text-center ${fase === 2 ? "splash-exit" : ""}`}>
        <div className="relative flex justify-center mb-8" style={{ animation: "containerPulse 2s ease-in-out infinite" }}>
          <div style={{ width: 140, height: 140, borderRadius: 30, background: "linear-gradient(135deg, #3a3028 0%, #1f1a15 100%)", position: "relative", overflow: "hidden", boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1)" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
              <defs>
                <linearGradient id="splashO" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#F97316" /><stop offset="50%" stopColor="#EA580C" /><stop offset="100%" stopColor="#B45309" /></linearGradient>
                <linearGradient id="splashD" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#475569" /><stop offset="50%" stopColor="#1e293b" /><stop offset="100%" stopColor="#0f172a" /></linearGradient>
              </defs>
              <ellipse cx="58" cy="50" rx="22" ry="28" fill="none" stroke="url(#splashD)" strokeWidth="7" style={{ animation: "ringIn2 1s ease-out both", transformOrigin: "58px 50px" }} />
              <ellipse cx="42" cy="50" rx="22" ry="28" fill="none" stroke="url(#splashO)" strokeWidth="7" style={{ animation: "ringIn1 1s ease-out both", animationDelay: "0.3s", transformOrigin: "42px 50px" }} />
              <path d="M 62 38 Q 66 45 64 52" fill="none" stroke="url(#splashD)" strokeWidth="7" strokeLinecap="round" style={{ animation: "textFade 0.5s ease-out both", animationDelay: "1s" }} />
            </svg>
          </div>
        </div>
        {fase >= 1 && (
          <div style={{ animation: "textFade 0.6s ease-out both" }}>
            <div className="flex items-baseline justify-center mb-2" style={{ fontSize: 52, fontWeight: 900, letterSpacing: "-0.03em", fontFamily: "'Inter', sans-serif" }}>
              <span style={{ color: "#F97316" }}>raw</span>
              <span style={{ color: "#F5F5F4" }}>link</span>
            </div>
            <div className="text-stone-400 text-xs font-mono tracking-[0.35em]">CONEXIÓN DIRECTA Y AUTÉNTICA</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ TOUR GUIADO ============
const tourPasos = [
  { titulo: "¡Bienvenido a rawlink!", desc: "Te voy a mostrar en 60 segundos cómo funciona la plataforma B2B de materias primas más completa de Colombia.", icono: Sparkles, vista: null },
  { titulo: "Catálogo de materias primas", desc: "Explora 12.000+ productos de proveedores verificados. Filtra por categoría, certificaciones y tipo de envío.", icono: Store, vista: "marketplace" },
  { titulo: "Mercado en vivo", desc: "Monitorea precios en tiempo real estilo bolsa de valores. Perfecto para decidir el mejor momento de compra.", icono: LineChart, vista: "mercado" },
  { titulo: "Cotizaciones (RFQ)", desc: "Publica una solicitud y recibe ofertas de múltiples proveedores. Compara precios, tiempos y términos de pago.", icono: FileText, vista: "cotizaciones" },
  { titulo: "Calculadora de costos", desc: "Carga tu fórmula de producción y calcula automáticamente el costo unitario. Detecta cuando los precios afectan tu margen.", icono: Calculator, vista: "costos" },
  { titulo: "Inventario inteligente", desc: "Las compras se añaden automáticamente. Recibe alertas cuando necesitas reponer materias primas.", icono: Boxes, vista: "inventario" },
  { titulo: "¡Ya estás listo!", desc: "Explora con libertad. Puedes reiniciar este tour en cualquier momento con el botón de ayuda (?) abajo a la derecha.", icono: Award, vista: "inicio" },
];

function TourGuiado({ step, setStep, onClose, vista, setVista }) {
  const paso = tourPasos[step];
  const Ic = paso.icono;
  useEffect(() => { if (paso.vista && paso.vista !== vista) setVista(paso.vista); }, [step]);
  const siguiente = () => step < tourPasos.length - 1 ? setStep(step + 1) : onClose();
  const anterior = () => step > 0 && setStep(step - 1);
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose}></div>
      <div className="absolute bottom-24 right-6 md:bottom-6 md:right-24 pointer-events-auto max-w-sm w-[calc(100%-3rem)] slide-in">
        <div className="p-6 relative overflow-hidden grain" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid rgba(249, 115, 22, 0.3)", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(249, 115, 22, 0.15)" }}>
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-100 hover:bg-stone-800"><X size={16} /></button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 8px 24px rgba(249, 115, 22, 0.4)" }}><Ic size={22} className="text-stone-900" /></div>
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-orange-500">PASO {step + 1} DE {tourPasos.length}</div>
              <div className="text-stone-500 text-[10px] flex gap-1 mt-0.5">
                {tourPasos.map((_, i) => <div key={i} className="h-0.5 flex-1 rounded-full transition-all" style={{ width: 16, background: i <= step ? "#F97316" : "#3a3028" }}></div>)}
              </div>
            </div>
          </div>
          <h3 className="text-xl font-black text-stone-100 mb-2 font-display">{paso.titulo}</h3>
          <p className="text-sm text-stone-400 leading-relaxed mb-5">{paso.desc}</p>
          <div className="flex items-center justify-between gap-2">
            <button onClick={onClose} className="text-xs text-stone-500 hover:text-stone-300">Saltar tour</button>
            <div className="flex gap-2">
              {step > 0 && <button onClick={anterior} className="px-3 py-2 text-sm font-semibold rounded-lg text-stone-300 hover:bg-stone-800 flex items-center gap-1" style={{ border: "1px solid #3a3028" }}><ChevronLeft size={14} />Atrás</button>}
              <button onClick={siguiente} className="px-4 py-2 text-sm font-bold text-stone-900 rounded-lg hover:-translate-y-0.5 transition-all flex items-center gap-1" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
                {step < tourPasos.length - 1 ? <>Siguiente<ChevronRight size={14} /></> : <>Finalizar<Check size={14} /></>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ COTIZACIONES (RFQ) ============
function generarRespuestasSimuladas(cot) {
  const provs = [...proveedores].filter(p => Math.random() > 0.3).slice(0, Math.min(4, proveedores.length));
  return provs.map((p, i) => ({
    id: `R-${i + 1}`,
    proveedorId: p.id,
    precioUnitario: cot.precioReferencia * (0.88 + Math.random() * 0.25),
    tiempoEntrega: [3, 5, 7, 10, 14][Math.floor(Math.random() * 5)],
    terminoPago: ["Contado", "30 días", "60 días", "Contra entrega"][Math.floor(Math.random() * 4)],
    comentario: ["Descuento por volumen disponible.", "Podemos personalizar el empaque.", "Incluye despacho gratuito a tu ciudad.", "Disponibilidad inmediata en stock.", "Aceptamos devolución en 30 días."][Math.floor(Math.random() * 5)],
    fecha: new Date().toLocaleDateString("es-CO"),
  })).sort((a, b) => a.precioUnitario - b.precioUnitario);
}

function Cotizaciones({ cotizaciones, crearCotizacion, aceptarCotizacion }) {
  const [modalCrear, setModalCrear] = useState(false);
  const [expandida, setExpandida] = useState(null);
  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Cotizaciones</h1>
          <p className="text-stone-500">Solicita ofertas a múltiples proveedores y compara</p>
        </div>
        <button onClick={() => setModalCrear(true)} className="text-stone-900 font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)" }}>
          <Plus size={16} strokeWidth={3} />Nueva cotización
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <Kpi icon={FileText} lbl="Total solicitadas" val={cotizaciones.length} accent="o" />
        <Kpi icon={Clock} lbl="Abiertas" val={cotizaciones.filter(c => c.estado === "Abierta").length} accent="o" />
        <Kpi icon={Check} lbl="Aceptadas" val={cotizaciones.filter(c => c.estado === "Aceptada").length} accent="e" />
      </div>

      {cotizaciones.length === 0 ? (
        <div className="p-16 text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px dashed #3a3028", borderRadius: "16px" }}>
          <FileText size={56} className="mx-auto text-stone-600 mb-4" />
          <h3 className="text-xl font-bold text-stone-200 mb-2">Aún no tienes cotizaciones</h3>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">Publica una solicitud de cotización (RFQ) y recibe ofertas de múltiples proveedores para que elijas la mejor.</p>
          <button onClick={() => setModalCrear(true)} className="text-stone-900 font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
            <Plus size={16} />Crear primera cotización
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cotizaciones.map(rfq => (
            <div key={rfq.id} className="overflow-hidden" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "12px" }}>
              <div className="p-5 border-b border-stone-800">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-stone-500">{rfq.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: rfq.estado === "Aceptada" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)", color: rfq.estado === "Aceptada" ? "#6EE7B7" : "#FCD34D", border: `1px solid ${rfq.estado === "Aceptada" ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}` }}>{rfq.estado.toUpperCase()}</span>
                    </div>
                    <h3 className="text-lg font-black text-stone-100 font-display">{rfq.producto}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-stone-400 mt-2">
                      <span>Cantidad: <strong className="text-stone-200">{fmtN(rfq.cantidad)} {rfq.unidad}</strong></span>
                      <span>·</span>
                      <span>Ciudad: <strong className="text-stone-200">{rfq.ciudad}</strong></span>
                      <span>·</span>
                      <span>Publicada: <strong className="text-stone-200">{rfq.fecha}</strong></span>
                    </div>
                    {rfq.notas && <p className="text-xs text-stone-500 mt-2 italic">"{rfq.notas}"</p>}
                  </div>
                  <button onClick={() => setExpandida(expandida === rfq.id ? null : rfq.id)} className="px-3 py-2 text-xs font-semibold rounded-lg text-stone-300 hover:bg-stone-800 flex items-center gap-1" style={{ border: "1px solid #3a3028" }}>
                    {rfq.respuestas.length} ofertas {expandida === rfq.id ? "▲" : "▼"}
                  </button>
                </div>
              </div>
              {expandida === rfq.id && (
                <div className="p-4 space-y-3">
                  {rfq.respuestas.length === 0 ? (
                    <p className="text-sm text-stone-500 text-center py-4">Sin respuestas aún...</p>
                  ) : (
                    rfq.respuestas.map((resp, i) => {
                      const prov = provById(resp.proveedorId);
                      const esMejor = i === 0;
                      const aceptada = rfq.respuestaAceptada === resp.id;
                      return (
                        <div key={resp.id} className="p-4 relative" style={{ background: aceptada ? "rgba(16, 185, 129, 0.08)" : "rgba(0,0,0,0.3)", border: `1px solid ${aceptada ? "rgba(16, 185, 129, 0.4)" : esMejor ? "rgba(249, 115, 22, 0.3)" : "#3a3028"}`, borderRadius: "10px" }}>
                          {esMejor && !aceptada && <div className="absolute -top-2 left-4 px-2 py-0.5 text-[9px] font-bold text-stone-900 rounded" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>MEJOR PRECIO</div>}
                          {aceptada && <div className="absolute -top-2 left-4 px-2 py-0.5 text-[9px] font-bold text-stone-900 rounded" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>ACEPTADA</div>}
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 items-center">
                            <div className="md:col-span-2">
                              <div className="font-bold text-stone-100 text-sm">{prov.nombre}</div>
                              <div className="text-xs text-stone-500 flex items-center gap-1"><Star size={10} className="fill-orange-500 text-orange-500" />{prov.calificacion} · {prov.ciudad}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-stone-500 font-mono">PRECIO/UNID</div>
                              <div className="font-black text-stone-100 font-display text-lg">{fmtCOP(resp.precioUnitario)}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-stone-500 font-mono">TOTAL</div>
                              <div className="font-bold text-orange-400 font-mono">{fmtCOP(resp.precioUnitario * rfq.cantidad)}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-stone-500 font-mono">ENTREGA</div>
                              <div className="font-bold text-stone-200 text-sm">{resp.tiempoEntrega} días</div>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between flex-wrap gap-2">
                            <div className="text-xs text-stone-400"><span className="text-stone-500">Pago:</span> {resp.terminoPago} · <span className="italic">"{resp.comentario}"</span></div>
                            {rfq.estado === "Abierta" && (
                              <button onClick={() => aceptarCotizacion(rfq.id, resp.id)} className="px-3 py-1.5 text-xs font-bold text-stone-900 rounded-lg hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}>
                                Aceptar oferta
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {modalCrear && <ModalCrearRFQ onClose={() => setModalCrear(false)} onSave={(c) => { crearCotizacion(c); setModalCrear(false); }} />}
    </div>
  );
}

function ModalCrearRFQ({ onClose, onSave }) {
  const [f, setF] = useState({ producto: "", cantidad: 100, unidad: "kg", precioReferencia: 20000, ciudad: "Bogotá", notas: "" });
  const sugerencias = materias.slice(0, 6);
  const inputStyle = { background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028", borderRadius: "8px" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "16px" }} onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 text-stone-900 p-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
          <div>
            <div className="text-xs font-mono tracking-wider font-bold">NUEVA COTIZACIÓN</div>
            <div className="font-black text-xl font-display">Publica tu solicitud</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-900/20 flex items-center justify-center"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="p-3 flex items-start gap-2" style={{ background: "rgba(249, 115, 22, 0.08)", border: "1px solid rgba(249, 115, 22, 0.2)", borderRadius: "8px" }}>
            <Lightbulb size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-stone-300">Tu solicitud se enviará a todos los proveedores de la categoría. Recibirás ofertas con precio, tiempo de entrega y términos de pago para comparar.</p>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1">Materia prima solicitada</label>
            <input type="text" value={f.producto} onChange={e => setF({ ...f, producto: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none" placeholder="Ej: Algodón peinado 30/1" style={inputStyle} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {sugerencias.map(s => <button key={s.id} onClick={() => setF({ ...f, producto: s.nombre, unidad: s.unidad, precioReferencia: s.precio })} className="text-[10px] px-2 py-1 rounded-full text-stone-400 hover:text-orange-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>{s.img} {s.nombre}</button>)}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Cantidad</label>
              <input type="number" value={f.cantidad} onChange={e => setF({ ...f, cantidad: parseInt(e.target.value) || 0 })} className="w-full p-2.5 font-mono text-stone-100 focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Unidad</label>
              <select value={f.unidad} onChange={e => setF({ ...f, unidad: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none" style={inputStyle}>{["kg", "g", "L", "m", "m²", "unidad"].map(u => <option key={u}>{u}</option>)}</select>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Precio referencia</label>
              <input type="number" value={f.precioReferencia} onChange={e => setF({ ...f, precioReferencia: parseInt(e.target.value) || 0 })} className="w-full p-2.5 font-mono text-stone-100 focus:outline-none" style={inputStyle} />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1">Ciudad de entrega</label>
            <select value={f.ciudad} onChange={e => setF({ ...f, ciudad: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none" style={inputStyle}>{["Bogotá", "Medellín", "Cali", "Barranquilla", "Bucaramanga", "Cartagena"].map(c => <option key={c}>{c}</option>)}</select>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-400 block mb-1">Notas adicionales (opcional)</label>
            <textarea value={f.notas} onChange={e => setF({ ...f, notas: e.target.value })} className="w-full p-2.5 text-stone-100 focus:outline-none min-h-[80px]" placeholder="Certificaciones requeridas, especificaciones técnicas, condiciones especiales..." style={inputStyle} />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-3 rounded-lg font-semibold text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}>Cancelar</button>
            <button onClick={() => onSave(f)} disabled={!f.producto || f.cantidad <= 0} className="flex-1 text-stone-900 py-3 rounded-lg font-bold disabled:opacity-40 flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><Send size={14} />Enviar a proveedores</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CALCULADORA DE COSTOS ============
function Costos({ recetas, guardarReceta, eliminarReceta }) {
  const [modalReceta, setModalReceta] = useState(null);
  const [activa, setActiva] = useState(null);

  const calcularCosto = (receta) => {
    return receta.ingredientes.reduce((total, ing) => {
      const mat = materias.find(m => m.id === ing.materiaId);
      if (!mat) return total;
      return total + mat.precio * ing.cantidad;
    }, 0);
  };

  const calcularVariacion = (receta) => {
    return receta.ingredientes.reduce((tv, ing) => {
      const mat = materias.find(m => m.id === ing.materiaId);
      if (!mat) return tv;
      const dif = (mat.precio - mat.precioAnt) * ing.cantidad;
      return tv + dif;
    }, 0);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-black text-stone-100 mb-1 font-display">Calculadora de costos</h1>
          <p className="text-stone-500">Define tus fórmulas y calcula el costo real de producción</p>
        </div>
        <button onClick={() => setModalReceta({})} className="text-stone-900 font-bold px-5 py-2.5 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 4px 16px rgba(249, 115, 22, 0.3)" }}>
          <Plus size={16} strokeWidth={3} />Nueva fórmula
        </button>
      </div>

      {recetas.length === 0 ? (
        <div className="p-16 text-center" style={{ background: "rgba(0,0,0,0.2)", border: "1px dashed #3a3028", borderRadius: "16px" }}>
          <Calculator size={56} className="mx-auto text-stone-600 mb-4" />
          <h3 className="text-xl font-bold text-stone-200 mb-2">Crea tu primera fórmula de producción</h3>
          <p className="text-stone-500 mb-6 max-w-md mx-auto">Define qué materias primas usas para fabricar un producto. El sistema calcula automáticamente el costo y te alerta cuando los precios afecten tu margen.</p>
          <button onClick={() => setModalReceta({})} className="text-stone-900 font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
            <Plus size={16} />Crear fórmula
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
          <div className="space-y-3">
            {recetas.map(r => {
              const costo = calcularCosto(r);
              const variacion = calcularVariacion(r);
              const variacionPct = (variacion / costo) * 100;
              const precioVenta = r.precioVenta || costo * 1.4;
              const margen = precioVenta - costo;
              const margenPct = (margen / precioVenta) * 100;
              const esActiva = activa?.id === r.id;
              return (
                <div key={r.id} onClick={() => setActiva(r)} className="p-5 cursor-pointer transition-all hover:-translate-y-0.5" style={{ background: esActiva ? "linear-gradient(135deg, #2a1f15, #1a1612)" : "linear-gradient(135deg, #2a2018, #1a1612)", border: `1px solid ${esActiva ? "#F97316" : "#3a3028"}`, borderRadius: "14px" }}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <div className="text-[10px] font-mono text-orange-500 tracking-wider uppercase mb-1">Fórmula · {r.ingredientes.length} ingredientes</div>
                      <h3 className="text-lg font-black text-stone-100 font-display">{r.nombre}</h3>
                      <p className="text-xs text-stone-500">Produce: {r.unidadProducto || "1 unidad"}</p>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={e => { e.stopPropagation(); setModalReceta(r); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-orange-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}><Edit size={14} /></button>
                      <button onClick={e => { e.stopPropagation(); eliminarReceta(r.id); }} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-300 hover:text-red-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <div className="text-[10px] font-mono text-stone-500 mb-1">COSTO</div>
                      <div className="font-black text-stone-100 font-display">{fmtCOP(costo)}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-stone-500 mb-1">MARGEN</div>
                      <div className="font-black font-mono" style={{ color: margenPct > 30 ? "#34D399" : margenPct > 15 ? "#FCD34D" : "#F87171" }}>{margenPct.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-stone-500 mb-1">VARIACIÓN</div>
                      <div className={`font-mono font-bold text-sm flex items-center gap-1 ${variacion > 0 ? "text-red-400" : variacion < 0 ? "text-emerald-400" : "text-stone-400"}`}>
                        {variacion > 0 ? <TrendingUp size={12} /> : variacion < 0 ? <TrendingDown size={12} /> : null}
                        {variacion > 0 ? "+" : ""}{variacionPct.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  {Math.abs(variacionPct) > 3 && (
                    <div className="mt-3 p-2 flex items-center gap-2 text-xs" style={{ background: variacion > 0 ? "rgba(239, 68, 68, 0.08)" : "rgba(16, 185, 129, 0.08)", border: `1px solid ${variacion > 0 ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"}`, borderRadius: "6px" }}>
                      <AlertCircle size={12} className={variacion > 0 ? "text-red-400" : "text-emerald-400"} />
                      <span className="text-stone-300">{variacion > 0 ? "El costo subió" : "El costo bajó"} {fmtCOP(Math.abs(variacion))} esta semana por variación de precios.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {activa && <DetalleReceta receta={activa} />}
        </div>
      )}

      {modalReceta && <ModalReceta receta={modalReceta} onClose={() => setModalReceta(null)} onSave={(r) => { guardarReceta(r); setModalReceta(null); }} />}
    </div>
  );
}

function DetalleReceta({ receta }) {
  const costo = receta.ingredientes.reduce((t, ing) => {
    const m = materias.find(x => x.id === ing.materiaId);
    return m ? t + m.precio * ing.cantidad : t;
  }, 0);
  const precioVenta = receta.precioVenta || costo * 1.4;
  return (
    <div className="p-5 sticky top-6" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "14px", height: "fit-content" }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><Calculator size={18} className="text-stone-900" /></div>
        <div>
          <div className="text-[10px] font-mono tracking-[0.2em] text-orange-500">DESGLOSE</div>
          <h3 className="font-black text-stone-100 font-display">{receta.nombre}</h3>
        </div>
      </div>
      <div className="space-y-2 mb-5">
        {receta.ingredientes.map((ing, i) => {
          const m = materias.find(x => x.id === ing.materiaId);
          if (!m) return null;
          const subtotal = m.precio * ing.cantidad;
          const pct = (subtotal / costo) * 100;
          return (
            <div key={i} className="p-3" style={{ background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{m.img}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-stone-100 truncate">{m.nombre}</div>
                  <div className="text-[10px] text-stone-500 font-mono">{ing.cantidad} {m.unidad} × {fmtCOP(m.precio)}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-stone-100">{fmtCOP(subtotal)}</div>
                  <div className="text-[10px] text-stone-500">{pct.toFixed(1)}%</div>
                </div>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.4)" }}>
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #F97316, #EA580C)" }}></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="space-y-2 pt-4 border-t border-stone-800">
        <div className="flex items-center justify-between text-sm"><span className="text-stone-400">Costo total</span><span className="font-mono font-bold text-stone-100">{fmtCOP(costo)}</span></div>
        <div className="flex items-center justify-between text-sm"><span className="text-stone-400">Precio de venta sugerido</span><span className="font-mono font-bold text-stone-100">{fmtCOP(precioVenta)}</span></div>
        <div className="flex items-center justify-between text-sm"><span className="text-stone-400">Utilidad</span><span className="font-mono font-bold text-emerald-400">{fmtCOP(precioVenta - costo)}</span></div>
        <div className="flex items-center justify-between pt-2 border-t border-stone-800"><span className="font-bold text-stone-100">Margen</span><span className="text-2xl font-black font-display" style={{ color: ((precioVenta - costo) / precioVenta) > 0.3 ? "#34D399" : ((precioVenta - costo) / precioVenta) > 0.15 ? "#FCD34D" : "#F87171" }}>{(((precioVenta - costo) / precioVenta) * 100).toFixed(1)}%</span></div>
      </div>
    </div>
  );
}

function ModalReceta({ receta, onClose, onSave }) {
  const [f, setF] = useState({
    id: receta.id || null,
    nombre: receta.nombre || "",
    unidadProducto: receta.unidadProducto || "1 unidad",
    precioVenta: receta.precioVenta || 0,
    ingredientes: receta.ingredientes || []
  });
  const inputStyle = { background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028", borderRadius: "8px" };

  const addIng = () => setF({ ...f, ingredientes: [...f.ingredientes, { materiaId: materias[0].id, cantidad: 1 }] });
  const updIng = (i, v) => { const n = [...f.ingredientes]; n[i] = { ...n[i], ...v }; setF({ ...f, ingredientes: n }); };
  const delIng = (i) => setF({ ...f, ingredientes: f.ingredientes.filter((_, idx) => idx !== i) });

  const costoTotal = f.ingredientes.reduce((t, ing) => {
    const m = materias.find(x => x.id === ing.materiaId);
    return m ? t + m.precio * ing.cantidad : t;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "16px" }} onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 text-stone-900 p-5 flex items-center justify-between z-10" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
          <div>
            <div className="text-xs font-mono tracking-wider font-bold">{f.id ? "EDITAR" : "NUEVA"} FÓRMULA</div>
            <div className="font-black text-xl font-display">{f.nombre || "Calculadora de producción"}</div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-900/20 flex items-center justify-center"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Nombre del producto</label>
              <input type="text" value={f.nombre} onChange={e => setF({ ...f, nombre: e.target.value })} placeholder="Ej: Camiseta básica algodón" className="w-full p-2.5 text-stone-100 focus:outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Unidad producida</label>
              <input type="text" value={f.unidadProducto} onChange={e => setF({ ...f, unidadProducto: e.target.value })} placeholder="Ej: 1 camiseta, 1 lote de 100" className="w-full p-2.5 text-stone-100 focus:outline-none" style={inputStyle} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-stone-400">Ingredientes / Materias primas</label>
              <button onClick={addIng} className="text-xs font-bold text-orange-400 flex items-center gap-1"><Plus size={12} />Agregar ingrediente</button>
            </div>
            <div className="space-y-2">
              {f.ingredientes.length === 0 && <p className="text-xs text-stone-500 text-center py-4 italic">Agrega las materias primas que necesitas para este producto</p>}
              {f.ingredientes.map((ing, i) => {
                const m = materias.find(x => x.id === ing.materiaId);
                return (
                  <div key={i} className="p-3 grid grid-cols-[1fr_100px_30px] gap-2 items-center" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "8px" }}>
                    <select value={ing.materiaId} onChange={e => updIng(i, { materiaId: parseInt(e.target.value) })} className="p-2 text-stone-100 text-sm focus:outline-none" style={inputStyle}>
                      {materias.map(x => <option key={x.id} value={x.id}>{x.img} {x.nombre} ({fmtCOP(x.precio)}/{x.unidad})</option>)}
                    </select>
                    <div className="flex items-center gap-1">
                      <input type="number" step="0.01" value={ing.cantidad} onChange={e => updIng(i, { cantidad: parseFloat(e.target.value) || 0 })} className="flex-1 p-2 font-mono text-stone-100 text-sm focus:outline-none text-center" style={inputStyle} />
                      <span className="text-xs text-stone-500">{m?.unidad}</span>
                    </div>
                    <button onClick={() => delIng(i)} className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-400 hover:text-red-400" style={{ background: "rgba(0,0,0,0.4)" }}><X size={14} /></button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-4" style={{ background: "rgba(249, 115, 22, 0.05)", border: "1px solid rgba(249, 115, 22, 0.2)", borderRadius: "8px" }}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-300">Costo calculado</span>
              <span className="text-2xl font-black font-display text-orange-400">{fmtCOP(costoTotal)}</span>
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-400 block mb-1">Precio de venta (opcional)</label>
              <input type="number" value={f.precioVenta} onChange={e => setF({ ...f, precioVenta: parseFloat(e.target.value) || 0 })} placeholder={`Sugerido: ${fmtCOP(costoTotal * 1.4)}`} className="w-full p-2.5 font-mono text-stone-100 focus:outline-none" style={inputStyle} />
              {f.precioVenta > 0 && costoTotal > 0 && (
                <div className="mt-2 text-xs text-stone-400">Margen: <strong style={{ color: ((f.precioVenta - costoTotal) / f.precioVenta) > 0.3 ? "#34D399" : "#FCD34D" }}>{(((f.precioVenta - costoTotal) / f.precioVenta) * 100).toFixed(1)}%</strong> · Utilidad: <strong className="text-emerald-400">{fmtCOP(f.precioVenta - costoTotal)}</strong></div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-3 rounded-lg font-semibold text-stone-300 hover:bg-stone-800" style={{ border: "1px solid #3a3028" }}>Cancelar</button>
            <button onClick={() => onSave(f)} disabled={!f.nombre || f.ingredientes.length === 0} className="flex-1 text-stone-900 py-3 rounded-lg font-bold disabled:opacity-40" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>{f.id ? "Guardar fórmula" : "Crear fórmula"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ ASISTENTE IA (CHAT) ============
const respuestasIA = {
  default: [
    "Estoy analizando tu consulta... ¿puedes darme más detalles sobre qué materia prima te interesa?",
    "Según los datos del mercado, hay varias opciones disponibles. ¿Tu prioridad es precio, calidad o tiempo de entrega?",
  ],
  saludo: [
    "¡Hola! Soy Ray, tu asistente de rawlink. Puedo ayudarte con: análisis de precios, recomendaciones de proveedores, predicciones de mercado y gestión de inventario. ¿En qué te ayudo hoy?",
  ],
  precio: [
    "📊 **Análisis de precios últimos 30 días:**\n\n• Algodón Peinado: +5.6% (tendencia alcista)\n• Polipropileno: +3.0% (estable al alza)\n• Glicerina USP: -4.3% (oportunidad de compra)\n• Dióxido de Titanio: -2.0% (estable)\n\n💡 **Mi recomendación:** Comprar Glicerina ahora. Los modelos predictivos sugieren que tocó piso esta semana.",
  ],
  proveedor: [
    "🏆 **Top 3 proveedores según desempeño:**\n\n1. **QuimiColombia Ltda.** (Bogotá) - ⭐ 4.9 · 30 años · Mejor para químicos\n2. **Textiles del Valle S.A.** (Cali) - ⭐ 4.8 · 22 años · Fuerte en textiles premium\n3. **Cueros del Norte** (Barranquilla) - ⭐ 4.7 · 25 años · Especialistas en cueros\n\n¿Quieres que te muestre sus catálogos o inicie una cotización?",
  ],
  inventario: [
    "📦 **Análisis de tu inventario:**\n\nBasado en tu consumo histórico, te sugiero:\n\n• Reponer Algodón Peinado en 5 días\n• Stock óptimo de Polipropileno: 2.400 kg (tienes 2.100)\n• Excedente detectado en Glicerina: considera vender 200L en marketplace circular\n\n⚠️ **Alerta:** Al ritmo actual, tu cobre AWG 14 se agotará en 12 días.",
  ],
  comprar: [
    "💰 **Mejor momento de compra según análisis IA:**\n\n🟢 **COMPRAR AHORA:**\n• Glicerina USP (tocó mínimo)\n• Cuero Vacuno (-2.6% semana)\n\n🟡 **ESPERAR:**\n• Algodón (subirá 3-5% próximos días)\n• Acero Cold Rolled (volatilidad alta)\n\n¿Quieres que active alertas de precio?",
  ],
  mercado: [
    "📈 **Resumen del mercado hoy:**\n\n• 7 materias al alza · 5 a la baja\n• Volumen total: $1.2B COP\n• Sector más activo: Polímeros (+12% volumen)\n• Predicción semanal: tendencia mixta\n\nLos químicos cosméticos muestran fortaleza por demanda exportadora de Ecuador.",
  ],
  ahorrar: [
    "💡 **3 formas de ahorrar este mes:**\n\n1. **Compra grupal:** Únete al grupo de 5 empresas comprando polipropileno = 12% descuento\n2. **Proveedor alternativo:** Cambia Cueros del Norte → Curtiembres Sur = 8% menos\n3. **Timing:** Espera 3 días para comprar algodón (predicción: baja 4%)\n\nAhorro estimado: $1.8M COP mensuales.",
  ],
  cotizar: [
    "📋 Puedo ayudarte a crear una cotización (RFQ) optimizada:\n\n1. Define qué necesitas\n2. Te sugiero cantidad óptima según tu inventario\n3. Envío automático a los 4 mejores proveedores por categoría\n4. Recibes ofertas en 24-48 horas\n\n¿Quieres que abra el formulario de nueva cotización?",
  ],
};

function detectarIntencion(msg) {
  const m = msg.toLowerCase();
  if (/hola|buenos|buenas|hey|saludos/.test(m)) return "saludo";
  if (/precio|cuánto|cuesta|variación|costo/.test(m)) return "precio";
  if (/proveedor|quién|empresa|vendedor/.test(m)) return "proveedor";
  if (/inventario|stock|bodega|reponer/.test(m)) return "inventario";
  if (/comprar|adquirir|momento/.test(m)) return "comprar";
  if (/mercado|tendencia|hoy|resumen/.test(m)) return "mercado";
  if (/ahorr|descuento|rebaja|reducir/.test(m)) return "ahorrar";
  if (/cotiz|rfq|solicit|oferta/.test(m)) return "cotizar";
  return "default";
}

function ChatIA({ onClose }) {
  const [mensajes, setMensajes] = useState([
    { tipo: "ia", texto: "¡Hola! Soy **Ray**, tu asistente IA de rawlink. 🤖\n\nPuedo ayudarte con análisis de precios, recomendaciones, predicciones y mucho más. ¿En qué te ayudo?" }
  ]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const sugerencias = ["📊 Análisis de precios", "🏆 Mejores proveedores", "📦 Revisar mi inventario", "💰 Cuándo comprar", "💡 Cómo ahorrar"];

  const enviar = (texto) => {
    if (!texto.trim()) return;
    const userMsg = { tipo: "user", texto };
    setMensajes(p => [...p, userMsg]);
    setInput("");
    setEscribiendo(true);

    setTimeout(() => {
      const intencion = detectarIntencion(texto);
      const opciones = respuestasIA[intencion];
      const respuesta = opciones[Math.floor(Math.random() * opciones.length)];
      setMensajes(p => [...p, { tipo: "ia", texto: respuesta }]);
      setEscribiendo(false);
    }, 1200 + Math.random() * 800);
  };

  return (
    <>
      {/* Overlay clickeable para cerrar */}
      <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Botón flotante de cerrar - SIEMPRE VISIBLE */}
      <button onClick={onClose} className="fixed top-6 right-6 z-[110] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 8px 24px rgba(239, 68, 68, 0.6)" }} title="Cerrar asistente (ESC)">
        <X size={24} strokeWidth={3} />
      </button>

      {/* Ventana del chat */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[100] w-[calc(100%-2rem)] sm:w-[400px] h-[600px] max-h-[85vh] slide-in flex flex-col overflow-hidden" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0a08 100%)", border: "1px solid #3a3028", borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(249, 115, 22, 0.15)" }}>
        {/* Header */}
        <div className="p-4 border-b border-stone-800 flex items-center gap-3" style={{ background: "linear-gradient(135deg, #1e293b, #0f172a)" }}>
          <div className="relative">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>
              <Bot size={20} className="text-stone-900" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2" style={{ borderColor: "#0f172a" }}></div>
          </div>
          <div className="flex-1">
            <div className="font-bold text-stone-100 flex items-center gap-2">Ray <span className="text-[9px] font-mono px-1.5 py-0.5 rounded text-stone-900" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}>IA</span></div>
            <div className="text-xs text-emerald-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full pulse-dot"></span>En línea · Asistente rawlink</div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)" }} title="Cerrar (ESC)"><X size={20} strokeWidth={3} /></button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mensajes.map((m, i) => (
            <div key={i} className={`flex ${m.tipo === "user" ? "justify-end" : "justify-start"} slide-in`}>
              {m.tipo === "ia" && <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><Bot size={14} className="text-stone-900" /></div>}
              <div className={`max-w-[80%] p-3 text-sm ${m.tipo === "user" ? "text-stone-900 rounded-2xl rounded-tr-sm" : "text-stone-100 rounded-2xl rounded-tl-sm"}`} style={m.tipo === "user" ? { background: "linear-gradient(135deg, #F97316, #EA580C)" } : { background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>
                {m.texto.split("\n").map((line, j) => (
                  <div key={j} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #F97316">$1</strong>') }} />
                ))}
              </div>
            </div>
          ))}
          {escribiendo && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><Bot size={14} className="text-stone-900" /></div>
              <div className="p-3 rounded-2xl rounded-tl-sm" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-orange-500 rounded-full" style={{ animation: "pulseDot 1s ease-in-out infinite" }}></span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full" style={{ animation: "pulseDot 1s ease-in-out infinite 0.2s" }}></span>
                  <span className="w-2 h-2 bg-orange-500 rounded-full" style={{ animation: "pulseDot 1s ease-in-out infinite 0.4s" }}></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sugerencias */}
        {mensajes.length <= 1 && (
          <div className="px-4 pb-2">
            <div className="text-[10px] font-mono text-stone-500 mb-2 tracking-wider">SUGERENCIAS</div>
            <div className="flex flex-wrap gap-1.5">
              {sugerencias.map(s => <button key={s} onClick={() => enviar(s)} className="text-xs px-2.5 py-1.5 rounded-full text-stone-300 hover:text-orange-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>{s}</button>)}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-stone-800" style={{ background: "rgba(0,0,0,0.3)" }}>
          <form onSubmit={(e) => { e.preventDefault(); enviar(input); }} className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Pregúntale a Ray..." className="flex-1 px-4 py-2.5 text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid #3a3028", borderRadius: "12px" }} autoFocus />
            <button type="submit" disabled={!input.trim()} className="w-11 h-11 rounded-xl flex items-center justify-center text-stone-900 disabled:opacity-40 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><Send size={16} /></button>
          </form>
          <div className="text-[9px] text-stone-600 mt-2 text-center">Ray es un asistente IA. Puede generar información inexacta.</div>
        </div>
      </div>
    </>
  );
}

// ============ COMMAND PALETTE (Cmd+K) ============
function CommandPalette({ onClose, setVista, setCarritoOpen, setChatOpen, setMapaOpen, setNotifOpen, setPantalla, setMatSel }) {
  const [query, setQuery] = useState("");
  const [selIdx, setSelIdx] = useState(0);

  const comandos = useMemo(() => [
    { grupo: "Navegación", items: [
      { nombre: "Ir a Inicio", icon: Grid3x3, atajo: "G I", accion: () => setVista("inicio") },
      { nombre: "Ir a Catálogo", icon: Store, atajo: "G C", accion: () => setVista("marketplace") },
      { nombre: "Ir a Mercado en vivo", icon: LineChart, atajo: "G M", accion: () => setVista("mercado") },
      { nombre: "Ir a Cotizaciones", icon: FileText, atajo: "G Q", accion: () => setVista("cotizaciones") },
      { nombre: "Ir a Calculadora de Costos", icon: Calculator, atajo: "G K", accion: () => setVista("costos") },
      { nombre: "Ir a Inventario", icon: Boxes, atajo: "G V", accion: () => setVista("inventario") },
      { nombre: "Ir a Pedidos", icon: Truck, atajo: "G P", accion: () => setVista("pedidos") },
      { nombre: "Ir a Analítica", icon: BarChart3, atajo: "G A", accion: () => setVista("analitica") },
    ]},
    { grupo: "Acciones", items: [
      { nombre: "Abrir carrito", icon: ShoppingCart, accion: () => setCarritoOpen(true) },
      { nombre: "Hablar con asistente IA (Ray)", icon: Bot, accion: () => setChatOpen(true) },
      { nombre: "Ver mapa de proveedores", icon: Map, accion: () => setMapaOpen(true) },
      { nombre: "Ver notificaciones", icon: Bell, accion: () => setNotifOpen(true) },
      { nombre: "Cambiar perfil (Empresa/Proveedor)", icon: User, accion: () => setPantalla("landing") },
    ]},
    { grupo: "Materias primas", items: materias.slice(0, 8).map(m => ({
      nombre: m.nombre, icon: () => <span className="text-base">{m.img}</span>, accion: () => setMatSel(m), sub: fmtCOP(m.precio) + "/" + m.unidad
    }))},
  ], []);

  const filtered = useMemo(() => {
    if (!query) return comandos;
    return comandos.map(g => ({
      ...g,
      items: g.items.filter(i => i.nombre.toLowerCase().includes(query.toLowerCase()))
    })).filter(g => g.items.length > 0);
  }, [query]);

  const flatList = filtered.flatMap(g => g.items);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); setSelIdx(i => Math.min(i + 1, flatList.length - 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelIdx(i => Math.max(i - 1, 0)); }
      if (e.key === "Enter" && flatList[selIdx]) { e.preventDefault(); flatList[selIdx].accion(); onClose(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selIdx, flatList]);

  return (
    <div className="fixed inset-0 z-[95] flex items-start justify-center pt-[10vh] p-4" style={{ background: "rgba(13, 10, 8, 0.75)", backdropFilter: "blur(10px)" }} onClick={onClose}>
      <div className="max-w-2xl w-full overflow-hidden slide-in" style={{ background: "linear-gradient(135deg, #1a1612, #0d0a08)", border: "1px solid #3a3028", borderRadius: "16px", boxShadow: "0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(249, 115, 22, 0.15)" }} onClick={e => e.stopPropagation()}>
        {/* Search */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-stone-800">
          <Command size={18} className="text-orange-500" />
          <input type="text" value={query} onChange={e => { setQuery(e.target.value); setSelIdx(0); }} placeholder="Buscar comando o materia prima..." className="flex-1 bg-transparent text-stone-100 placeholder:text-stone-500 focus:outline-none text-lg" autoFocus />
          <kbd className="text-[10px] font-mono px-2 py-1 rounded text-stone-400" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Search size={32} className="mx-auto text-stone-700 mb-2" />
              <p className="text-sm text-stone-500">Sin resultados para "<span className="text-stone-300">{query}</span>"</p>
            </div>
          ) : (
            filtered.map((grupo, gi) => {
              let idxBase = 0;
              for (let i = 0; i < gi; i++) idxBase += filtered[i].items.length;
              return (
                <div key={grupo.grupo}>
                  <div className="px-5 py-2 text-[10px] font-mono tracking-[0.2em] text-stone-500">{grupo.grupo.toUpperCase()}</div>
                  {grupo.items.map((it, ii) => {
                    const Ic = it.icon;
                    const idx = idxBase + ii;
                    const activo = selIdx === idx;
                    return (
                      <button key={it.nombre} onMouseEnter={() => setSelIdx(idx)} onClick={() => { it.accion(); onClose(); }} className="w-full flex items-center gap-3 px-5 py-2.5 text-left" style={{ background: activo ? "rgba(249, 115, 22, 0.1)" : "transparent" }}>
                        <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: activo ? "rgba(249, 115, 22, 0.15)" : "rgba(0,0,0,0.4)", color: activo ? "#F97316" : "#a8a29e" }}>
                          {typeof Ic === "function" && Ic.prototype?.isReactComponent === undefined ? <Ic /> : <Ic size={14} />}
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <span className={`text-sm ${activo ? "text-stone-100 font-semibold" : "text-stone-300"}`}>{it.nombre}</span>
                          {it.sub && <span className="text-xs text-stone-500 font-mono">{it.sub}</span>}
                          {it.atajo && <kbd className="text-[9px] font-mono px-1.5 py-0.5 rounded text-stone-500" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>{it.atajo}</kbd>}
                        </div>
                        {activo && <ChevronRight size={14} className="text-orange-500" />}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-stone-800 flex items-center justify-between text-[10px] text-stone-500" style={{ background: "rgba(0,0,0,0.3)" }}>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><kbd className="font-mono px-1 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>↑↓</kbd> navegar</span>
            <span className="flex items-center gap-1"><kbd className="font-mono px-1 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>↵</kbd> seleccionar</span>
          </div>
          <span className="font-mono">{flatList.length} comandos</span>
        </div>
      </div>
    </div>
  );
}

// ============ PANEL DE NOTIFICACIONES ============
function NotifPanel({ notificaciones, onClose, marcarLeida, marcarTodas }) {
  return (
    <div className="fixed inset-0 z-[90]" onClick={onClose}>
      <div className="absolute top-20 right-4 lg:right-8 w-[calc(100%-2rem)] max-w-md max-h-[80vh] overflow-hidden slide-in" style={{ background: "linear-gradient(135deg, #1a1612, #0d0a08)", border: "1px solid #3a3028", borderRadius: "16px", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }} onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <Bell size={16} className="text-orange-500" />
              <h3 className="font-black text-stone-100 font-display">Notificaciones</h3>
            </div>
            <p className="text-xs text-stone-500">{notificaciones.filter(n => !n.leida).length} sin leer</p>
          </div>
          <button onClick={marcarTodas} className="text-xs text-orange-500 hover:text-orange-400 font-semibold">Marcar todas</button>
        </div>
        <div className="overflow-y-auto max-h-[60vh]">
          {notificaciones.map(n => {
            const Ic = n.icono;
            return (
              <button key={n.id} onClick={() => marcarLeida(n.id)} className="w-full flex items-start gap-3 px-4 py-3 text-left border-b border-stone-800/50 hover:bg-stone-900/40" style={{ background: !n.leida ? "rgba(249, 115, 22, 0.04)" : "transparent" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${n.color}15`, border: `1px solid ${n.color}30` }}>
                  <Ic size={16} style={{ color: n.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`text-sm font-semibold ${n.leida ? "text-stone-300" : "text-stone-100"}`}>{n.titulo}</div>
                    {!n.leida && <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1.5"></span>}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">{n.desc}</div>
                  <div className="text-[10px] text-stone-600 mt-1 font-mono">{n.tiempo}</div>
                </div>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-stone-800 text-center">
          <button className="text-xs text-stone-400 hover:text-orange-400">Ver todas las notificaciones</button>
        </div>
      </div>
    </div>
  );
}

// ============ MAPA DE PROVEEDORES ============
const proveedoresMapa = [
  { id: 1, nombre: "Textiles del Valle S.A.", ciudad: "Cali", x: 25, y: 62, categoria: "Textiles", productos: 24 },
  { id: 2, nombre: "Polímeros Andinos", ciudad: "Medellín", x: 30, y: 42, categoria: "Polímeros", productos: 18 },
  { id: 3, nombre: "QuimiColombia Ltda.", ciudad: "Bogotá", x: 45, y: 55, categoria: "Químicos", productos: 32 },
  { id: 4, nombre: "Metales Bucaramanga", ciudad: "Bucaramanga", x: 52, y: 35, categoria: "Metales", productos: 15 },
  { id: 5, nombre: "Cueros del Norte", ciudad: "Barranquilla", x: 42, y: 15, categoria: "Cueros", productos: 9 },
  { id: 6, nombre: "Plásticos Industriales SAS", ciudad: "Cali", x: 23, y: 64, categoria: "Polímeros", productos: 12 },
  { id: 7, nombre: "Empaques del Pacífico", ciudad: "Buenaventura", x: 15, y: 58, categoria: "Polímeros", productos: 8 },
  { id: 8, nombre: "Químicos del Caribe", ciudad: "Cartagena", x: 35, y: 12, categoria: "Químicos", productos: 21 },
];

function MapaProveedores({ onClose }) {
  const [sel, setSel] = useState(null);
  const [filtroCat, setFiltroCat] = useState("Todas");
  const cats = ["Todas", "Textiles", "Polímeros", "Químicos", "Metales", "Cueros"];
  const filtrados = filtroCat === "Todas" ? proveedoresMapa : proveedoresMapa.filter(p => p.categoria === filtroCat);

  const getColor = (cat) => ({ "Textiles": "#3B82F6", "Polímeros": "#8B5CF6", "Químicos": "#10B981", "Metales": "#64748B", "Cueros": "#B45309" }[cat] || "#F97316");

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: "rgba(13, 10, 8, 0.85)", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col slide-in" style={{ background: "#1a1612", border: "1px solid #3a3028", borderRadius: "20px", boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Map size={16} className="text-orange-500" />
              <span className="text-[10px] font-mono tracking-[0.2em] text-orange-500">RED DE PROVEEDORES · COLOMBIA</span>
            </div>
            <h2 className="text-2xl font-black text-stone-100 font-display">Mapa de proveedores</h2>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-stone-800 flex items-center justify-center text-stone-300"><X size={20} /></button>
        </div>

        {/* Filtros */}
        <div className="px-5 py-3 border-b border-stone-800 flex items-center gap-2 overflow-x-auto">
          {cats.map(c => (
            <button key={c} onClick={() => setFiltroCat(c)} className="px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap" style={{ background: filtroCat === c ? "linear-gradient(135deg, #F97316, #EA580C)" : "rgba(0,0,0,0.4)", color: filtroCat === c ? "#1a1612" : "#a8a29e", border: `1px solid ${filtroCat === c ? "transparent" : "#3a3028"}` }}>{c}</button>
          ))}
        </div>

        {/* Layout: Mapa + Lista */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_300px] overflow-hidden">
          {/* Mapa SVG */}
          <div className="relative p-5 overflow-hidden" style={{ background: "radial-gradient(ellipse at center, #2a2018 0%, #0d0a08 70%)" }}>
            <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="colombiaGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3a3028" /><stop offset="100%" stopColor="#1f1a15" /></linearGradient>
              </defs>
              {/* Silueta estilizada de Colombia */}
              <path d="M 20 10 Q 30 5 45 8 L 55 12 Q 65 15 62 25 L 68 35 Q 72 45 65 52 L 60 60 Q 50 72 38 70 L 28 68 Q 18 60 20 48 L 15 38 Q 10 28 15 20 Z" fill="url(#colombiaGrad)" stroke="#F97316" strokeWidth="0.3" strokeOpacity="0.3" />

              {/* Líneas de conexión entre ciudades principales */}
              {filtrados.length > 1 && filtrados.map((p, i) => i === 0 ? null : (
                <line key={p.id} x1={filtrados[0].x} y1={filtrados[0].y} x2={p.x} y2={p.y} stroke="#F97316" strokeWidth="0.15" strokeDasharray="0.5,0.5" opacity="0.2" />
              ))}

              {/* Pins */}
              {filtrados.map(p => {
                const activo = sel?.id === p.id;
                const color = getColor(p.categoria);
                return (
                  <g key={p.id} style={{ cursor: "pointer" }} onClick={() => setSel(p)}>
                    {/* Pulso */}
                    <circle cx={p.x} cy={p.y} r="2.5" fill={color} opacity="0.2" style={{ animation: "pulseDot 2s ease-in-out infinite" }} />
                    {/* Pin */}
                    <circle cx={p.x} cy={p.y} r={activo ? "1.8" : "1.2"} fill={color} stroke="#fff" strokeWidth="0.2" style={{ transition: "all 0.2s" }} />
                    {/* Label */}
                    {activo && (
                      <g>
                        <rect x={p.x + 2} y={p.y - 3.5} width={p.nombre.length * 0.8 + 2} height="5" fill="#0d0a08" stroke={color} strokeWidth="0.2" rx="0.8" />
                        <text x={p.x + 3} y={p.y - 0.5} fill="#fff" fontSize="1.8" fontFamily="Inter" fontWeight="600">{p.nombre}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Leyenda */}
            <div className="absolute bottom-5 left-5 p-3" style={{ background: "rgba(13, 10, 8, 0.8)", border: "1px solid #3a3028", borderRadius: "10px", backdropFilter: "blur(4px)" }}>
              <div className="text-[9px] font-mono text-stone-500 tracking-[0.2em] mb-2">CATEGORÍAS</div>
              <div className="space-y-1">
                {["Textiles", "Polímeros", "Químicos", "Metales", "Cueros"].map(c => (
                  <div key={c} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: getColor(c) }}></div>
                    <span className="text-stone-300">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="absolute top-5 right-5 p-3 text-right" style={{ background: "rgba(13, 10, 8, 0.8)", border: "1px solid #3a3028", borderRadius: "10px", backdropFilter: "blur(4px)" }}>
              <div className="text-[9px] font-mono text-stone-500 tracking-[0.2em]">PROVEEDORES</div>
              <div className="text-3xl font-black text-orange-400 font-display">{filtrados.length}</div>
              <div className="text-[9px] text-stone-500">en {new Set(filtrados.map(p => p.ciudad)).size} ciudades</div>
            </div>
          </div>

          {/* Lista lateral */}
          <div className="border-l border-stone-800 overflow-y-auto" style={{ background: "#0d0a08" }}>
            {filtrados.map(p => {
              const activo = sel?.id === p.id;
              const color = getColor(p.categoria);
              return (
                <button key={p.id} onClick={() => setSel(p)} className="w-full text-left p-4 border-b border-stone-800 hover:bg-stone-900/40" style={{ background: activo ? "rgba(249, 115, 22, 0.08)" : "transparent" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${color}20`, border: `1px solid ${color}40` }}>
                      <Navigation size={14} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono tracking-wider uppercase" style={{ color }}>{p.categoria}</div>
                      <div className="font-bold text-stone-100 text-sm truncate">{p.nombre}</div>
                      <div className="text-xs text-stone-500 flex items-center gap-1 mt-0.5"><MapPin size={10} />{p.ciudad}</div>
                      <div className="text-xs text-stone-400 mt-1">{p.productos} productos</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ MODAL DE PLANES / SUSCRIPCIONES ============
function ModalPlanes({ onClose, showToast }) {
  const [billing, setBilling] = useState("mensual");

  // ⚠️ CAMBIA ESTE NÚMERO POR EL TUYO (sin + ni espacios, formato internacional)
  const WHATSAPP_NUMERO = "573143844070"; // Colombia: 57 + número sin el 0

  const abrirWhatsApp = (mensaje) => {
    const texto = encodeURIComponent(mensaje);
    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
    window.open(url, "_blank");
  };

  const handlePlanClick = (plan) => {
    if (plan.id === "free") {
      showToast("Ya estás en el plan Free");
    } else if (plan.id === "enterprise") {
      abrirWhatsApp(`Hola rawlink 👋, estoy interesado en el plan *Enterprise* (${fmtPrecio(plan.precio[billing])} COP/${billing === "mensual" ? "mes" : "año"}). ¿Me pueden brindar más información?`);
    } else if (plan.id === "business") {
      abrirWhatsApp(`Hola rawlink 👋, quiero mejorar al plan *Business* (${fmtPrecio(plan.precio[billing])} COP/${billing === "mensual" ? "mes" : "año"}). ¿Cómo puedo iniciar?`);
    }
  };

  const planes = [
    {
      id: "free",
      nombre: "Free",
      icono: Sparkles,
      color: "#64748B",
      precio: { mensual: 0, anual: 0 },
      desc: "Para empezar a explorar la plataforma",
      cta: "Plan actual",
      destacado: false,
      features: [
        { txt: "Hasta 10 cotizaciones (RFQ) al mes", inc: true },
        { txt: "Catálogo completo de proveedores", inc: true },
        { txt: "Mercado en vivo (con delay 15 min)", inc: true },
        { txt: "Inventario básico (50 referencias)", inc: true },
        { txt: "Asistente IA Ray (5 consultas/día)", inc: true },
        { txt: "Calculadora de costos", inc: false },
        { txt: "Predicciones IA avanzadas", inc: false },
        { txt: "Reportes exportables", inc: false },
        { txt: "Soporte prioritario", inc: false },
        { txt: "Integración con SAP/Siigo", inc: false },
      ],
    },
    {
      id: "business",
      nombre: "Business",
      icono: Rocket,
      color: "#F97316",
      precio: { mensual: 299000, anual: 2990000 },
      desc: "Para empresas en crecimiento",
      cta: "Mejorar a Business",
      destacado: true,
      badge: "MÁS POPULAR",
      features: [
        { txt: "Cotizaciones (RFQ) ilimitadas", inc: true },
        { txt: "Catálogo completo de proveedores", inc: true },
        { txt: "Mercado en vivo (tiempo real)", inc: true },
        { txt: "Inventario ilimitado", inc: true },
        { txt: "Asistente IA Ray ilimitado", inc: true },
        { txt: "Calculadora de costos avanzada", inc: true },
        { txt: "Predicciones IA a 30 días", inc: true },
        { txt: "Reportes mensuales en PDF", inc: true },
        { txt: "Soporte prioritario por chat", inc: true },
        { txt: "Integración con SAP/Siigo", inc: false },
      ],
    },
    {
      id: "enterprise",
      nombre: "Enterprise",
      icono: Crown,
      color: "#8B5CF6",
      precio: { mensual: 999000, anual: 9990000 },
      desc: "Para grandes operaciones industriales",
      cta: "Contactar ventas",
      destacado: false,
      features: [
        { txt: "Todo lo de Business +", inc: true },
        { txt: "Catálogo completo de proveedores", inc: true },
        { txt: "Datos crudos de mercado vía API", inc: true },
        { txt: "Multi-empresa (hasta 10 sucursales)", inc: true },
        { txt: "Asistente IA Ray + entrenamiento custom", inc: true },
        { txt: "Calculadora de costos por sucursal", inc: true },
        { txt: "Predicciones IA a 90 días + alertas", inc: true },
        { txt: "Reportes ejecutivos personalizados", inc: true },
        { txt: "Account manager dedicado 24/7", inc: true },
        { txt: "Integración con SAP/Siigo/Oracle", inc: true },
      ],
    },
  ];

  const fmtPrecio = (n) => n === 0 ? "Gratis" : new Intl.NumberFormat("es-CO").format(n);

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto fade-in" style={{ background: "rgba(13, 10, 8, 0.95)", backdropFilter: "blur(10px)" }} onClick={onClose}>
      {/* Botón flotante rojo SIEMPRE visible - posicionado debajo del header */}
      <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="fixed top-4 right-4 md:top-8 md:right-8 z-[300] w-14 h-14 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 8px 32px rgba(239, 68, 68, 0.8), 0 0 0 4px rgba(239, 68, 68, 0.2)" }} title="Cerrar (ESC)">
        <X size={28} strokeWidth={3} />
      </button>
      <div className="min-h-screen flex items-start justify-center p-4 py-8">
        <div className="max-w-6xl w-full" style={{ background: "linear-gradient(180deg, #1a1612 0%, #0d0a08 100%)", border: "1px solid #3a3028", borderRadius: "20px", boxShadow: "0 30px 80px rgba(0,0,0,0.7)" }} onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 z-10 p-5 border-b border-stone-800 flex items-center justify-between rounded-t-[20px]" style={{ background: "rgba(26, 22, 18, 0.98)", backdropFilter: "blur(8px)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)" }}><Crown size={20} className="text-stone-900" /></div>
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-orange-500">PLANES Y PRECIOS</div>
              <h2 className="text-2xl font-black text-stone-100 font-display">Elige el plan ideal para tu empresa</h2>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all hover:scale-110" style={{ background: "linear-gradient(135deg, #EF4444, #DC2626)", boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)" }} title="Cerrar"><X size={20} strokeWidth={3} /></button>
        </div>

        <div className="p-6 lg:p-8">
          {/* Toggle billing */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 rounded-full" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid #3a3028" }}>
              <button onClick={() => setBilling("mensual")} className="px-5 py-2 rounded-full text-sm font-semibold transition-all" style={{ background: billing === "mensual" ? "linear-gradient(135deg, #F97316, #EA580C)" : "transparent", color: billing === "mensual" ? "#1a1612" : "#a8a29e" }}>Mensual</button>
              <button onClick={() => setBilling("anual")} className="px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2" style={{ background: billing === "anual" ? "linear-gradient(135deg, #F97316, #EA580C)" : "transparent", color: billing === "anual" ? "#1a1612" : "#a8a29e" }}>
                Anual
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: billing === "anual" ? "rgba(26, 22, 18, 0.2)" : "rgba(16, 185, 129, 0.15)", color: billing === "anual" ? "#1a1612" : "#34D399" }}>-17%</span>
              </button>
            </div>
          </div>

          {/* Tarjetas de planes */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {planes.map(plan => {
              const Ic = plan.icono;
              const precio = plan.precio[billing];
              return (
                <div key={plan.id} className="relative p-6 grain overflow-hidden flex flex-col" style={{
                  background: plan.destacado ? "linear-gradient(135deg, #2a1f15 0%, #1a1612 100%)" : "linear-gradient(135deg, #2a2018, #1a1612)",
                  border: `${plan.destacado ? "2px" : "1px"} solid ${plan.destacado ? "#F97316" : "#3a3028"}`,
                  borderRadius: "16px",
                  boxShadow: plan.destacado ? "0 20px 60px rgba(249, 115, 22, 0.2)" : "0 10px 30px rgba(0,0,0,0.3)",
                  transform: plan.destacado ? "scale(1.02)" : "scale(1)",
                }}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] font-bold tracking-wider rounded-full text-stone-900" style={{ background: "linear-gradient(135deg, #F97316, #EA580C)", boxShadow: "0 4px 12px rgba(249, 115, 22, 0.4)" }}>
                      ⭐ {plan.badge}
                    </div>
                  )}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -translate-y-8 translate-x-8" style={{ background: `${plan.color}20` }}></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`, boxShadow: `0 8px 20px ${plan.color}40` }}>
                        <Ic size={22} className="text-white" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono tracking-[0.2em]" style={{ color: plan.color }}>PLAN</div>
                        <h3 className="text-2xl font-black text-stone-100 font-display">{plan.nombre}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-stone-400 mb-5">{plan.desc}</p>

                    <div className="mb-6 pb-6 border-b border-stone-800">
                      <div className="flex items-baseline gap-1">
                        {precio === 0 ? (
                          <span className="text-4xl font-black text-stone-100 font-display">Gratis</span>
                        ) : (
                          <>
                            <span className="text-2xl text-stone-400 font-mono">$</span>
                            <span className="text-4xl font-black text-stone-100 font-display">{fmtPrecio(precio)}</span>
                            <span className="text-sm text-stone-500 ml-1">COP/{billing === "mensual" ? "mes" : "año"}</span>
                          </>
                        )}
                      </div>
                      {billing === "anual" && precio > 0 && (
                        <div className="text-xs text-emerald-400 mt-1 font-semibold">≈ {fmtPrecio(Math.round(precio / 12))} /mes · Ahorras {fmtPrecio(plan.precio.mensual * 12 - precio)} al año</div>
                      )}
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <div className="w-4 h-4 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: f.inc ? `${plan.color}20` : "rgba(0,0,0,0.4)" }}>
                            {f.inc ? <Check size={10} strokeWidth={3} style={{ color: plan.color }} /> : <X size={10} className="text-stone-600" />}
                          </div>
                          <span className={f.inc ? "text-stone-300" : "text-stone-600 line-through"}>{f.txt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button onClick={() => handlePlanClick(plan)} className="mt-auto w-full py-3 rounded-lg font-bold transition-all hover:-translate-y-0.5" style={{
                    background: plan.id === "free" ? "rgba(0,0,0,0.4)" : plan.destacado ? "linear-gradient(135deg, #F97316, #EA580C)" : `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                    color: plan.id === "free" ? "#a8a29e" : plan.destacado ? "#1a1612" : "#fff",
                    border: plan.id === "free" ? "1px solid #3a3028" : "none",
                    boxShadow: plan.id !== "free" ? `0 8px 24px ${plan.color}40` : "none",
                  }}>
                    {plan.cta}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add-ons / extras */}
          <div className="mt-10 p-6 grain" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "16px" }}>
            <h3 className="text-lg font-black text-stone-100 mb-4 font-display flex items-center gap-2">
              <Zap size={18} className="text-orange-500" />
              Complementos disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
                <div className="flex items-center gap-2 mb-2"><Database size={16} className="text-orange-500" /><span className="font-bold text-stone-100">API REST completa</span></div>
                <div className="text-xs text-stone-400 mb-2">Integra rawlink directamente con tu ERP</div>
                <div className="text-sm font-bold text-orange-400 font-mono">+$199.000/mes</div>
              </div>
              <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
                <div className="flex items-center gap-2 mb-2"><Shield size={16} className="text-orange-500" /><span className="font-bold text-stone-100">Verificación premium</span></div>
                <div className="text-xs text-stone-400 mb-2">Sello rawlink Verified para tu perfil</div>
                <div className="text-sm font-bold text-orange-400 font-mono">+$89.000/mes</div>
              </div>
              <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
                <div className="flex items-center gap-2 mb-2"><Award size={16} className="text-orange-500" /><span className="font-bold text-stone-100">Posicionamiento destacado</span></div>
                <div className="text-xs text-stone-400 mb-2">Aparece en el top de búsquedas</div>
                <div className="text-sm font-bold text-orange-400 font-mono">+$249.000/mes</div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
              <div className="flex items-center gap-2 mb-2"><HelpCircle size={14} className="text-orange-500" /><span className="font-bold text-stone-100 text-sm">¿Puedo cambiar de plan en cualquier momento?</span></div>
              <p className="text-xs text-stone-400">Sí, puedes mejorar o reducir tu plan en cualquier momento. Los cambios se reflejan en tu próxima facturación.</p>
            </div>
            <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
              <div className="flex items-center gap-2 mb-2"><HelpCircle size={14} className="text-orange-500" /><span className="font-bold text-stone-100 text-sm">¿Hay periodo de prueba?</span></div>
              <p className="text-xs text-stone-400">Todos los planes pagos incluyen 14 días de prueba gratuita. Sin tarjeta de crédito requerida.</p>
            </div>
            <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
              <div className="flex items-center gap-2 mb-2"><HelpCircle size={14} className="text-orange-500" /><span className="font-bold text-stone-100 text-sm">¿Aceptan facturación electrónica?</span></div>
              <p className="text-xs text-stone-400">Sí, emitimos factura electrónica DIAN. También aceptamos pago por transferencia, tarjeta o PSE.</p>
            </div>
            <div className="p-4" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid #3a3028", borderRadius: "10px" }}>
              <div className="flex items-center gap-2 mb-2"><HelpCircle size={14} className="text-orange-500" /><span className="font-bold text-stone-100 text-sm">¿Hay descuentos para PYMES?</span></div>
              <p className="text-xs text-stone-400">Empresas registradas como PYME tienen 25% de descuento durante el primer año en el plan Business.</p>
            </div>
          </div>

          {/* Logos de empresas (social proof) */}
          <div className="mt-10 text-center">
            <p className="text-xs text-stone-500 mb-4 font-mono tracking-[0.2em]">EMPRESAS QUE YA CONFÍAN EN RAWLINK</p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-60">
              {["TEXTILES SA", "POLÍMEROS SAS", "QUIMICOL", "CUEROS BO", "INDUSTRIAS ABC"].map(n => (
                <div key={n} className="text-stone-400 font-display font-black text-lg tracking-wider">{n}</div>
              ))}
            </div>
          </div>

          {/* CTA final */}
          <div className="mt-10 p-8 text-center grain relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)", borderRadius: "16px" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-black text-stone-900 mb-2 font-display">¿Necesitas un plan personalizado?</h3>
              <p className="text-stone-900/80 mb-5 max-w-lg mx-auto">Diseñamos planes a medida para grupos empresariales, gremios y asociaciones industriales.</p>
              <button onClick={() => abrirWhatsApp("Hola rawlink 👋, necesito un plan personalizado para mi empresa. ¿Podemos agendar una llamada?")} className="px-6 py-3 rounded-lg font-bold bg-stone-900 text-orange-400 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Hablar con un asesor <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

// ============ GRÁFICO DE VENTAS MENSUALES (área con gradiente) ============
function GraficoVentasMensuales() {
  // Datos simulados de los últimos 12 meses
  const datos = [
    { mes: "May", ventas: 3200000 },
    { mes: "Jun", ventas: 4100000 },
    { mes: "Jul", ventas: 3850000 },
    { mes: "Ago", ventas: 5200000 },
    { mes: "Sep", ventas: 4900000 },
    { mes: "Oct", ventas: 6100000 },
    { mes: "Nov", ventas: 5800000 },
    { mes: "Dic", ventas: 7300000 },
    { mes: "Ene", ventas: 6500000 },
    { mes: "Feb", ventas: 7800000 },
    { mes: "Mar", ventas: 8200000 },
    { mes: "Abr", ventas: 9405000 },
  ];

  const max = Math.max(...datos.map(d => d.ventas));
  const min = Math.min(...datos.map(d => d.ventas));
  const range = max - min || 1;
  const w = 600, h = 200, padding = 30;
  const innerW = w - padding * 2;
  const innerH = h - padding * 2;
  const step = innerW / (datos.length - 1);

  const puntos = datos.map((d, i) => ({
    x: padding + i * step,
    y: padding + innerH - ((d.ventas - min) / range) * innerH,
    ventas: d.ventas,
    mes: d.mes,
  }));

  const polylinePath = puntos.map(p => `${p.x},${p.y}`).join(" ");
  const areaPath = `M ${puntos.map(p => `${p.x},${p.y}`).join(" L ")} L ${puntos[puntos.length - 1].x},${padding + innerH} L ${puntos[0].x},${padding + innerH} Z`;

  // Total y crecimiento
  const totalAnual = datos.reduce((s, d) => s + d.ventas, 0);
  const ultimo = datos[datos.length - 1].ventas;
  const anterior = datos[datos.length - 2].ventas;
  const crecimiento = ((ultimo - anterior) / anterior) * 100;

  const [hover, setHover] = useState(null);

  return (
    <div className="p-5" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "14px" }}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={16} className="text-emerald-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400">VENTAS MENSUALES</span>
          </div>
          <h3 className="font-black text-stone-100 font-display">Ingresos últimos 12 meses</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-stone-100 font-display">{fmtCOP(totalAnual)}</div>
          <div className={`text-xs font-mono font-bold flex items-center justify-end gap-1 ${crecimiento > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {crecimiento > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {crecimiento > 0 ? "+" : ""}{crecimiento.toFixed(1)}% vs mes anterior
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 200 }}>
          <defs>
            <linearGradient id="ventasGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineaVentas" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>

          {/* Líneas de fondo */}
          {[0.25, 0.5, 0.75].map(p => (
            <line key={p} x1={padding} y1={padding + innerH * p} x2={w - padding} y2={padding + innerH * p} stroke="#3a3028" strokeDasharray="2,3" strokeWidth="0.5" />
          ))}

          {/* Área */}
          <path d={areaPath} fill="url(#ventasGrad)" />

          {/* Línea */}
          <polyline fill="none" stroke="url(#lineaVentas)" strokeWidth="2.5" points={polylinePath} strokeLinecap="round" strokeLinejoin="round" />

          {/* Puntos */}
          {puntos.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={hover === i ? "5" : "3"} fill="#10B981" stroke="#1a1612" strokeWidth="2" style={{ cursor: "pointer", transition: "r 0.2s" }} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />
              {hover === i && (
                <g>
                  <rect x={p.x - 50} y={p.y - 40} width="100" height="28" fill="#0d0a08" stroke="#10B981" strokeWidth="1" rx="4" />
                  <text x={p.x} y={p.y - 28} fill="#fff" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">{fmtCOP(p.ventas)}</text>
                  <text x={p.x} y={p.y - 18} fill="#a8a29e" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">{p.mes}</text>
                </g>
              )}
            </g>
          ))}

          {/* Etiquetas X */}
          {puntos.map((p, i) => (
            <text key={i} x={p.x} y={h - 10} fill="#78716c" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">{p.mes}</text>
          ))}
        </svg>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-800">
        <div>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">PROMEDIO MES</div>
          <div className="font-mono font-bold text-stone-100 text-sm">{fmtCOP(totalAnual / 12)}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">MEJOR MES</div>
          <div className="font-mono font-bold text-emerald-400 text-sm">{fmtCOP(max)}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">MENOR MES</div>
          <div className="font-mono font-bold text-stone-300 text-sm">{fmtCOP(min)}</div>
        </div>
      </div>
    </div>
  );
}

// ============ GRÁFICO DE PEDIDOS MENSUALES (barras) ============
function GraficoPedidosMensuales() {
  const datos = [
    { mes: "May", pedidos: 12 },
    { mes: "Jun", pedidos: 18 },
    { mes: "Jul", pedidos: 15 },
    { mes: "Ago", pedidos: 22 },
    { mes: "Sep", pedidos: 19 },
    { mes: "Oct", pedidos: 28 },
    { mes: "Nov", pedidos: 25 },
    { mes: "Dic", pedidos: 34 },
    { mes: "Ene", pedidos: 31 },
    { mes: "Feb", pedidos: 38 },
    { mes: "Mar", pedidos: 42 },
    { mes: "Abr", pedidos: 47 },
  ];

  const max = Math.max(...datos.map(d => d.pedidos));
  const w = 600, h = 200, padding = 30;
  const innerW = w - padding * 2;
  const innerH = h - padding * 2;
  const barW = innerW / datos.length * 0.65;
  const barGap = innerW / datos.length;

  const totalPedidos = datos.reduce((s, d) => s + d.pedidos, 0);
  const ultimo = datos[datos.length - 1].pedidos;
  const anterior = datos[datos.length - 2].pedidos;
  const crecimiento = ((ultimo - anterior) / anterior) * 100;

  const [hover, setHover] = useState(null);

  return (
    <div className="p-5" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "14px" }}>
      <div className="flex items-start justify-between mb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Truck size={16} className="text-orange-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-orange-400">PEDIDOS MENSUALES</span>
          </div>
          <h3 className="font-black text-stone-100 font-display">Volumen últimos 12 meses</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-stone-100 font-display">{totalPedidos}</div>
          <div className={`text-xs font-mono font-bold flex items-center justify-end gap-1 ${crecimiento > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {crecimiento > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {crecimiento > 0 ? "+" : ""}{crecimiento.toFixed(1)}% vs mes anterior
          </div>
        </div>
      </div>

      <div className="relative mt-4">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 200 }}>
          <defs>
            <linearGradient id="barraPedidos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="barraPedidosHover" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Líneas de fondo */}
          {[0.25, 0.5, 0.75].map(p => (
            <line key={p} x1={padding} y1={padding + innerH * p} x2={w - padding} y2={padding + innerH * p} stroke="#3a3028" strokeDasharray="2,3" strokeWidth="0.5" />
          ))}

          {/* Barras */}
          {datos.map((d, i) => {
            const altura = (d.pedidos / max) * innerH;
            const x = padding + i * barGap + (barGap - barW) / 2;
            const y = padding + innerH - altura;
            const esHover = hover === i;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={altura}
                  fill={esHover ? "url(#barraPedidosHover)" : "url(#barraPedidos)"}
                  rx="3"
                  style={{ cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                />
                {/* Tooltip */}
                {esHover && (
                  <g>
                    <rect x={x + barW / 2 - 30} y={y - 28} width="60" height="22" fill="#0d0a08" stroke="#F97316" strokeWidth="1" rx="4" />
                    <text x={x + barW / 2} y={y - 13} fill="#fff" fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle" fontWeight="bold">{d.pedidos}</text>
                  </g>
                )}
                {/* Etiqueta valor encima */}
                <text x={x + barW / 2} y={y - 4} fill="#a8a29e" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">{d.pedidos}</text>
              </g>
            );
          })}

          {/* Etiquetas X */}
          {datos.map((d, i) => (
            <text key={i} x={padding + i * barGap + barGap / 2} y={h - 10} fill="#78716c" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">{d.mes}</text>
          ))}
        </svg>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-800">
        <div>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">PROMEDIO MES</div>
          <div className="font-mono font-bold text-stone-100 text-sm">{Math.round(totalPedidos / 12)}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">MEJOR MES</div>
          <div className="font-mono font-bold text-orange-400 text-sm">{max}</div>
        </div>
        <div>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">TICKET PROM.</div>
          <div className="font-mono font-bold text-stone-300 text-sm">$199K</div>
        </div>
      </div>
    </div>
  );
}

// ============ GRÁFICO DE VENTAS POR CLIENTE POR MES (barras apiladas) ============
function GraficoVentasPorCliente() {
  // Clientes principales con sus colores
  const clientes = [
    { nombre: "Confecciones El Valle", color: "#F97316" },
    { nombre: "Textiles Andina SAS", color: "#10B981" },
    { nombre: "Moda Urbana Ltda.", color: "#3B82F6" },
    { nombre: "Manufacturas Bogotá", color: "#8B5CF6" },
    { nombre: "Otros", color: "#64748B" },
  ];

  // Datos simulados últimos 12 meses, ventas por cliente en miles de COP
  const datos = [
    { mes: "May", ventas: [850, 620, 480, 720, 530] },
    { mes: "Jun", ventas: [920, 780, 540, 980, 880] },
    { mes: "Jul", ventas: [780, 850, 620, 880, 720] },
    { mes: "Ago", ventas: [1100, 980, 720, 1240, 1160] },
    { mes: "Sep", ventas: [1050, 920, 680, 1180, 1070] },
    { mes: "Oct", ventas: [1380, 1180, 920, 1450, 1170] },
    { mes: "Nov", ventas: [1280, 1280, 880, 1380, 980] },
    { mes: "Dic", ventas: [1620, 1480, 1180, 1820, 1200] },
    { mes: "Ene", ventas: [1480, 1380, 1080, 1620, 940] },
    { mes: "Feb", ventas: [1820, 1620, 1280, 1980, 1100] },
    { mes: "Mar", ventas: [1980, 1780, 1380, 2080, 980] },
    { mes: "Abr", ventas: [2280, 2080, 1620, 2380, 1045] },
  ];

  // Calcular totales y máximo
  const totales = datos.map(d => d.ventas.reduce((a, b) => a + b, 0));
  const max = Math.max(...totales);
  const totalGeneral = totales.reduce((a, b) => a + b, 0) * 1000;
  const ultimo = totales[totales.length - 1];
  const anterior = totales[totales.length - 2];
  const crecimiento = ((ultimo - anterior) / anterior) * 100;

  // Total por cliente (todo el año)
  const totalPorCliente = clientes.map((c, i) => ({
    ...c,
    total: datos.reduce((s, d) => s + d.ventas[i], 0) * 1000,
  })).sort((a, b) => b.total - a.total);

  const w = 900, h = 280, padding = 35;
  const innerW = w - padding * 2;
  const innerH = h - padding * 2;
  const barW = innerW / datos.length * 0.7;
  const barGap = innerW / datos.length;

  const [hover, setHover] = useState(null);

  return (
    <div className="p-5" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "14px" }}>
      <div className="flex items-start justify-between mb-1 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={16} className="text-orange-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-orange-400">VENTAS POR CLIENTE</span>
          </div>
          <h3 className="font-black text-stone-100 font-display">Ingresos por cliente últimos 12 meses</h3>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-stone-100 font-display">{fmtCOP(totalGeneral)}</div>
          <div className={`text-xs font-mono font-bold flex items-center justify-end gap-1 ${crecimiento > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {crecimiento > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {crecimiento > 0 ? "+" : ""}{crecimiento.toFixed(1)}% vs mes anterior
          </div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-3 mt-4 mb-2">
        {clientes.map(c => (
          <div key={c.nombre} className="flex items-center gap-1.5 text-xs">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: c.color }}></div>
            <span className="text-stone-300">{c.nombre}</span>
          </div>
        ))}
      </div>

      <div className="relative mt-3">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 280 }}>
          {/* Líneas de fondo */}
          {[0.25, 0.5, 0.75, 1].map(p => (
            <g key={p}>
              <line x1={padding} y1={padding + innerH * (1 - p)} x2={w - padding} y2={padding + innerH * (1 - p)} stroke="#3a3028" strokeDasharray="2,3" strokeWidth="0.5" />
              <text x={padding - 5} y={padding + innerH * (1 - p) + 3} fill="#78716c" fontSize="8" fontFamily="JetBrains Mono" textAnchor="end">${Math.round(max * p / 1000)}M</text>
            </g>
          ))}

          {/* Barras apiladas */}
          {datos.map((d, i) => {
            const x = padding + i * barGap + (barGap - barW) / 2;
            const totalMes = totales[i];
            let yAcum = padding + innerH;
            const esHover = hover === i;

            return (
              <g key={i}>
                {clientes.map((cliente, ci) => {
                  const valor = d.ventas[ci];
                  const altura = (valor / max) * innerH;
                  yAcum -= altura;
                  return (
                    <rect
                      key={ci}
                      x={x}
                      y={yAcum}
                      width={barW}
                      height={altura}
                      fill={cliente.color}
                      opacity={esHover || hover === null ? 1 : 0.4}
                      style={{ cursor: "pointer", transition: "opacity 0.2s" }}
                      onMouseEnter={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                    />
                  );
                })}

                {/* Línea separadora superior */}
                <line x1={x} y1={padding + innerH - (totalMes / max) * innerH} x2={x + barW} y2={padding + innerH - (totalMes / max) * innerH} stroke="#1a1612" strokeWidth="1" opacity="0.3" />

                {/* Total encima de la barra */}
                <text x={x + barW / 2} y={padding + innerH - (totalMes / max) * innerH - 5} fill="#a8a29e" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">${(totalMes / 1000).toFixed(1)}M</text>

                {/* Etiqueta mes */}
                <text x={x + barW / 2} y={h - 12} fill="#78716c" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">{d.mes}</text>
              </g>
            );
          })}

          {/* Tooltip detallado */}
          {hover !== null && (
            <g>
              {(() => {
                const x = padding + hover * barGap + (barGap - barW) / 2;
                const tooltipW = 180;
                const tooltipH = 100;
                const tooltipX = Math.min(Math.max(x + barW / 2 - tooltipW / 2, padding), w - padding - tooltipW);
                const tooltipY = padding + 10;
                const totalMes = totales[hover];
                return (
                  <>
                    <rect x={tooltipX} y={tooltipY} width={tooltipW} height={tooltipH} fill="#0d0a08" stroke="#F97316" strokeWidth="1" rx="6" />
                    <text x={tooltipX + 8} y={tooltipY + 14} fill="#F97316" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">{datos[hover].mes.toUpperCase()} · TOTAL: ${(totalMes / 1000).toFixed(2)}M</text>
                    {clientes.map((c, ci) => {
                      const valor = datos[hover].ventas[ci];
                      const pct = (valor / totalMes) * 100;
                      return (
                        <g key={ci}>
                          <rect x={tooltipX + 8} y={tooltipY + 22 + ci * 14} width="6" height="6" fill={c.color} rx="1" />
                          <text x={tooltipX + 18} y={tooltipY + 27 + ci * 14} fill="#fff" fontSize="8" fontFamily="Inter">{c.nombre.substring(0, 22)}</text>
                          <text x={tooltipX + tooltipW - 8} y={tooltipY + 27 + ci * 14} fill="#a8a29e" fontSize="8" fontFamily="JetBrains Mono" textAnchor="end">${(valor / 1000).toFixed(1)}M ({pct.toFixed(0)}%)</text>
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Top clientes */}
      <div className="mt-4 pt-4 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono text-stone-500 tracking-[0.2em]">TOP CLIENTES (12 MESES)</div>
          <div className="text-[10px] font-mono text-stone-500">{clientes.length} clientes activos</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
          {totalPorCliente.map((c, i) => {
            const pct = (c.total / totalGeneral) * 100;
            return (
              <div key={c.nombre} className="p-3" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${c.color}30`, borderRadius: "8px" }}>
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }}></div>
                  <span className="text-[10px] font-mono text-stone-500">#{i + 1}</span>
                </div>
                <div className="text-[11px] font-semibold text-stone-200 line-clamp-1">{c.nombre}</div>
                <div className="font-mono font-bold text-sm mt-1" style={{ color: c.color }}>{fmtCOP(c.total)}</div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">{pct.toFixed(1)}% del total</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ GRÁFICO DE GANANCIAS NETAS ============
function GraficoGananciasNetas() {
  // Datos por mes: ingresos brutos y todos los costos
  const datos = [
    { mes: "May", ingresos: 3200000, costoMP: 1280000, costoEnvio: 192000, costoOper: 480000, comision: 96000, otros: 64000 },
    { mes: "Jun", ingresos: 4100000, costoMP: 1640000, costoEnvio: 246000, costoOper: 615000, comision: 123000, otros: 82000 },
    { mes: "Jul", ingresos: 3850000, costoMP: 1540000, costoEnvio: 231000, costoOper: 577000, comision: 115000, otros: 77000 },
    { mes: "Ago", ingresos: 5200000, costoMP: 2080000, costoEnvio: 312000, costoOper: 780000, comision: 156000, otros: 104000 },
    { mes: "Sep", ingresos: 4900000, costoMP: 1960000, costoEnvio: 294000, costoOper: 735000, comision: 147000, otros: 98000 },
    { mes: "Oct", ingresos: 6100000, costoMP: 2440000, costoEnvio: 366000, costoOper: 915000, comision: 183000, otros: 122000 },
    { mes: "Nov", ingresos: 5800000, costoMP: 2320000, costoEnvio: 348000, costoOper: 870000, comision: 174000, otros: 116000 },
    { mes: "Dic", ingresos: 7300000, costoMP: 2920000, costoEnvio: 438000, costoOper: 1095000, comision: 219000, otros: 146000 },
    { mes: "Ene", ingresos: 6500000, costoMP: 2600000, costoEnvio: 390000, costoOper: 975000, comision: 195000, otros: 130000 },
    { mes: "Feb", ingresos: 7800000, costoMP: 3120000, costoEnvio: 468000, costoOper: 1170000, comision: 234000, otros: 156000 },
    { mes: "Mar", ingresos: 8200000, costoMP: 3280000, costoEnvio: 492000, costoOper: 1230000, comision: 246000, otros: 164000 },
    { mes: "Abr", ingresos: 9405000, costoMP: 3762000, costoEnvio: 564000, costoOper: 1411000, comision: 282000, otros: 188000 },
  ].map(d => {
    const costoTotal = d.costoMP + d.costoEnvio + d.costoOper + d.comision + d.otros;
    const gananciaBruta = d.ingresos - d.costoMP;
    const gananciaNeta = d.ingresos - costoTotal;
    const margen = (gananciaNeta / d.ingresos) * 100;
    return { ...d, costoTotal, gananciaBruta, gananciaNeta, margen };
  });

  // Totales acumulados
  const totIngresos = datos.reduce((s, d) => s + d.ingresos, 0);
  const totCostoMP = datos.reduce((s, d) => s + d.costoMP, 0);
  const totCostoEnvio = datos.reduce((s, d) => s + d.costoEnvio, 0);
  const totCostoOper = datos.reduce((s, d) => s + d.costoOper, 0);
  const totComision = datos.reduce((s, d) => s + d.comision, 0);
  const totOtros = datos.reduce((s, d) => s + d.otros, 0);
  const totCostos = totCostoMP + totCostoEnvio + totCostoOper + totComision + totOtros;
  const totGananciaNeta = totIngresos - totCostos;
  const margenPromedio = (totGananciaNeta / totIngresos) * 100;

  // Métricas comparativas
  const ultimo = datos[datos.length - 1];
  const anterior = datos[datos.length - 2];
  const crecimiento = ((ultimo.gananciaNeta - anterior.gananciaNeta) / anterior.gananciaNeta) * 100;

  // Setup del gráfico
  const w = 900, h = 280, padding = 40;
  const innerW = w - padding * 2;
  const innerH = h - padding * 2;
  const max = Math.max(...datos.map(d => d.ingresos));
  const step = innerW / (datos.length - 1);

  // Puntos para línea de ingresos y línea de ganancia neta
  const puntosIngresos = datos.map((d, i) => ({
    x: padding + i * step,
    y: padding + innerH - (d.ingresos / max) * innerH,
  }));
  const puntosGanancia = datos.map((d, i) => ({
    x: padding + i * step,
    y: padding + innerH - (d.gananciaNeta / max) * innerH,
  }));

  const lineaIngresos = puntosIngresos.map(p => `${p.x},${p.y}`).join(" ");
  const lineaGanancia = puntosGanancia.map(p => `${p.x},${p.y}`).join(" ");
  const areaGanancia = `M ${puntosGanancia.map(p => `${p.x},${p.y}`).join(" L ")} L ${puntosGanancia[puntosGanancia.length - 1].x},${padding + innerH} L ${puntosGanancia[0].x},${padding + innerH} Z`;

  const [hover, setHover] = useState(null);

  const desglose = [
    { lbl: "Materia prima", val: totCostoMP, color: "#F97316", icon: Package },
    { lbl: "Envíos", val: totCostoEnvio, color: "#3B82F6", icon: Truck },
    { lbl: "Operativos", val: totCostoOper, color: "#8B5CF6", icon: Building2 },
    { lbl: "Comisión rawlink", val: totComision, color: "#EC4899", icon: Zap },
    { lbl: "Otros", val: totOtros, color: "#64748B", icon: AlertCircle },
  ];

  return (
    <div className="p-5" style={{ background: "linear-gradient(135deg, #2a2018, #1a1612)", border: "1px solid #3a3028", borderRadius: "14px" }}>
      <div className="flex items-start justify-between mb-1 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={16} className="text-emerald-400" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400">P&L · GANANCIAS NETAS</span>
          </div>
          <h3 className="font-black text-stone-100 font-display">Análisis financiero anual</h3>
          <p className="text-xs text-stone-500 mt-0.5">Ingresos vs costos totales · Margen real de ganancia</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-stone-500 tracking-wider">GANANCIA NETA ACUMULADA</div>
          <div className="text-2xl font-black text-emerald-400 font-display">{fmtCOP(totGananciaNeta)}</div>
          <div className={`text-xs font-mono font-bold flex items-center justify-end gap-1 ${crecimiento > 0 ? "text-emerald-400" : "text-red-400"}`}>
            {crecimiento > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {crecimiento > 0 ? "+" : ""}{crecimiento.toFixed(1)}% vs mes anterior
          </div>
        </div>
      </div>

      {/* Resumen P&L superior */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 mb-4">
        <div className="p-3" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px" }}>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">INGRESOS BRUTOS</div>
          <div className="font-mono font-black text-stone-100 text-base mt-1">{fmtCOP(totIngresos)}</div>
        </div>
        <div className="p-3" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(239, 68, 68, 0.2)", borderRadius: "8px" }}>
          <div className="text-[9px] font-mono text-stone-500 tracking-wider">COSTOS TOTALES</div>
          <div className="font-mono font-black text-red-400 text-base mt-1">-{fmtCOP(totCostos)}</div>
        </div>
        <div className="p-3" style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "8px" }}>
          <div className="text-[9px] font-mono text-emerald-400 tracking-wider">UTILIDAD NETA</div>
          <div className="font-mono font-black text-emerald-400 text-base mt-1">{fmtCOP(totGananciaNeta)}</div>
        </div>
        <div className="p-3" style={{ background: "rgba(249, 115, 22, 0.08)", border: "1px solid rgba(249, 115, 22, 0.3)", borderRadius: "8px" }}>
          <div className="text-[9px] font-mono text-orange-400 tracking-wider">MARGEN NETO</div>
          <div className="font-mono font-black text-orange-400 text-base mt-1">{margenPromedio.toFixed(1)}%</div>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-3 mb-2">
        <div className="flex items-center gap-1.5 text-xs">
          <div className="w-4 h-0.5" style={{ background: "#a8a29e" }}></div>
          <span className="text-stone-300">Ingresos brutos</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <div className="w-4 h-2.5 rounded-sm" style={{ background: "linear-gradient(90deg, #10B981, #059669)" }}></div>
          <span className="text-stone-300">Ganancia neta</span>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative mt-3">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 280 }}>
          <defs>
            <linearGradient id="gananciaArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Líneas de fondo */}
          {[0.25, 0.5, 0.75, 1].map(p => (
            <g key={p}>
              <line x1={padding} y1={padding + innerH * (1 - p)} x2={w - padding} y2={padding + innerH * (1 - p)} stroke="#3a3028" strokeDasharray="2,3" strokeWidth="0.5" />
              <text x={padding - 5} y={padding + innerH * (1 - p) + 3} fill="#78716c" fontSize="8" fontFamily="JetBrains Mono" textAnchor="end">${(max * p / 1000000).toFixed(1)}M</text>
            </g>
          ))}

          {/* Área de ganancia neta */}
          <path d={areaGanancia} fill="url(#gananciaArea)" />

          {/* Línea de ingresos brutos (punteada gris) */}
          <polyline fill="none" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="4,3" points={lineaIngresos} strokeLinecap="round" />

          {/* Línea de ganancia neta (sólida verde) */}
          <polyline fill="none" stroke="#10B981" strokeWidth="2.5" points={lineaGanancia} strokeLinecap="round" strokeLinejoin="round" />

          {/* Puntos interactivos */}
          {datos.map((d, i) => {
            const esHover = hover === i;
            return (
              <g key={i}>
                {/* Zona de hover invisible amplia */}
                <rect x={padding + i * step - step / 2} y={padding} width={step} height={innerH} fill="transparent" style={{ cursor: "pointer" }} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} />

                {/* Punto ingresos */}
                <circle cx={puntosIngresos[i].x} cy={puntosIngresos[i].y} r={esHover ? "4" : "2.5"} fill="#a8a29e" stroke="#1a1612" strokeWidth="1.5" />

                {/* Punto ganancia */}
                <circle cx={puntosGanancia[i].x} cy={puntosGanancia[i].y} r={esHover ? "5" : "3"} fill="#10B981" stroke="#1a1612" strokeWidth="2" />

                {/* Línea vertical en hover */}
                {esHover && (
                  <line x1={puntosIngresos[i].x} y1={padding} x2={puntosIngresos[i].x} y2={padding + innerH} stroke="#F97316" strokeDasharray="2,2" strokeWidth="0.8" opacity="0.5" />
                )}

                {/* Etiqueta mes */}
                <text x={puntosIngresos[i].x} y={h - 12} fill="#78716c" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">{d.mes}</text>
              </g>
            );
          })}

          {/* Tooltip detallado */}
          {hover !== null && (
            <g>
              {(() => {
                const d = datos[hover];
                const x = puntosIngresos[hover].x;
                const tooltipW = 200;
                const tooltipH = 130;
                const tooltipX = Math.min(Math.max(x + 10, padding), w - padding - tooltipW);
                const tooltipY = padding + 5;
                return (
                  <>
                    <rect x={tooltipX} y={tooltipY} width={tooltipW} height={tooltipH} fill="#0d0a08" stroke="#10B981" strokeWidth="1" rx="6" />
                    <text x={tooltipX + 8} y={tooltipY + 14} fill="#10B981" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold">{d.mes.toUpperCase()} 2026 · DESGLOSE</text>

                    <text x={tooltipX + 8} y={tooltipY + 30} fill="#a8a29e" fontSize="8" fontFamily="Inter">Ingresos</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 30} fill="#fff" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end" fontWeight="bold">{fmtCOP(d.ingresos)}</text>

                    <text x={tooltipX + 8} y={tooltipY + 45} fill="#F97316" fontSize="8" fontFamily="Inter">- Materia prima</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 45} fill="#F97316" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end">-{fmtCOP(d.costoMP)}</text>

                    <text x={tooltipX + 8} y={tooltipY + 58} fill="#3B82F6" fontSize="8" fontFamily="Inter">- Envíos</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 58} fill="#3B82F6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end">-{fmtCOP(d.costoEnvio)}</text>

                    <text x={tooltipX + 8} y={tooltipY + 71} fill="#8B5CF6" fontSize="8" fontFamily="Inter">- Operativos</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 71} fill="#8B5CF6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end">-{fmtCOP(d.costoOper)}</text>

                    <text x={tooltipX + 8} y={tooltipY + 84} fill="#EC4899" fontSize="8" fontFamily="Inter">- Comisión + otros</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 84} fill="#EC4899" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end">-{fmtCOP(d.comision + d.otros)}</text>

                    <line x1={tooltipX + 8} y1={tooltipY + 92} x2={tooltipX + tooltipW - 8} y2={tooltipY + 92} stroke="#3a3028" strokeWidth="0.5" />

                    <text x={tooltipX + 8} y={tooltipY + 106} fill="#10B981" fontSize="9" fontFamily="Inter" fontWeight="bold">UTILIDAD NETA</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 106} fill="#10B981" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end" fontWeight="bold">{fmtCOP(d.gananciaNeta)}</text>

                    <text x={tooltipX + 8} y={tooltipY + 120} fill="#a8a29e" fontSize="8" fontFamily="Inter">Margen</text>
                    <text x={tooltipX + tooltipW - 8} y={tooltipY + 120} fill="#FB923C" fontSize="9" fontFamily="JetBrains Mono" textAnchor="end" fontWeight="bold">{d.margen.toFixed(1)}%</text>
                  </>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Desglose anual de costos (donut style) */}
      <div className="mt-5 pt-5 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <div className="text-[10px] font-mono text-stone-500 tracking-[0.2em]">DESGLOSE ANUAL DE COSTOS</div>
          <div className="text-[10px] font-mono text-stone-500">Total: {fmtCOP(totCostos)}</div>
        </div>
        <div className="space-y-2">
          {desglose.map(d => {
            const Ic = d.icon;
            const pct = (d.val / totCostos) * 100;
            const pctIngresos = (d.val / totIngresos) * 100;
            return (
              <div key={d.lbl}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <Ic size={12} style={{ color: d.color }} />
                    <span className="text-stone-300 font-medium">{d.lbl}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-stone-500">{pctIngresos.toFixed(1)}% ingresos</span>
                    <span className="font-bold text-stone-100 min-w-[100px] text-right">{fmtCOP(d.val)}</span>
                    <span className="font-bold w-12 text-right" style={{ color: d.color }}>{pct.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.4)" }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${d.color}, ${d.color}aa)` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen final */}
        <div className="mt-5 p-4 grain relative overflow-hidden" style={{ background: "linear-gradient(135deg, #10B981, #059669)", borderRadius: "12px" }}>
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-8 translate-x-8"></div>
          <div className="relative flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="text-[10px] font-mono tracking-[0.2em] text-emerald-100 mb-1">UTILIDAD NETA ANUAL</div>
              <div className="text-3xl font-black font-display text-white">{fmtCOP(totGananciaNeta)}</div>
              <div className="text-xs text-emerald-100 mt-1">Margen promedio del {margenPromedio.toFixed(1)}% sobre {fmtCOP(totIngresos)} en ingresos</div>
            </div>
            <div className="flex items-center gap-2 text-white">
              <Award size={32} className="opacity-80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
