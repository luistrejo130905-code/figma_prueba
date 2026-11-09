import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { Input } from './components/Input';
import {
  Home,
  Plus,
  Calendar,
  TrendingUp,
  Bell,
  Menu,
  CreditCard,
  ArrowRight,
  Check,
  Trash2,
  Moon,
  Sun,
  LogOut,
  History,
  Play,
  FileText,
  CheckCircle2,
  Clock,
  UserPlus,
  Settings,
  ChevronDown,
  ChevronRight,
  Folder
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'catalog'
  | 'add'
  | 'history'
  | 'cards'
  | 'calendar'
  | 'analytics'
  | 'notifications'
  | 'profile';

interface Subscription {
  id: string;
  name: string;
  price: number;
  renewalDate: string;
  cutoffDay: number;
  category: string;
  code: string;
  logoUrl?: string;
  autoPay: boolean;
  cardLast4: string;
  status: 'Activa' | 'Pausada';
}

interface PaymentRecord {
  id: string;
  serviceName: string;
  amount: number;
  date: string;
  status: 'Aprobado' | 'Programado';
  method: string;
  reference: string;
  code: string;
}

interface PaymentCard {
  id: string;
  bank: string;
  brand: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
  holder: string;
  isDefault: boolean;
}

interface CatalogItem {
  name: string;
  category: string;
  defaultPrice: number;
  code: string;
  logoUrl: string;
}

const SERVICE_CATALOG: CatalogItem[] = [
  { name: 'Servicio Eléctrico (CFE)', category: 'Servicios Básicos', defaultPrice: 450.00, code: 'IMG-01', logoUrl: '/img/servicios/cfe.png' },
  { name: 'Plan Móvil (Telcel)', category: 'Telecomunicaciones', defaultPrice: 399.00, code: 'IMG-02', logoUrl: '/img/servicios/telcel.png' },
  { name: 'Internet (Telmex)', category: 'Servicios Básicos', defaultPrice: 499.00, code: 'IMG-03', logoUrl: '/img/servicios/telmex.png' },
  { name: 'Netflix', category: 'Streaming', defaultPrice: 219.00, code: 'IMG-04', logoUrl: '/img/servicios/netflix.png' },
  { name: 'Spotify', category: 'Streaming', defaultPrice: 129.00, code: 'IMG-05', logoUrl: '/img/servicios/spotify.png' },
  { name: 'Disney+', category: 'Streaming', defaultPrice: 179.00, code: 'IMG-06', logoUrl: '/img/servicios/disney.png' },
  { name: 'Amazon Prime', category: 'Streaming', defaultPrice: 99.00, code: 'IMG-07', logoUrl: '/img/servicios/prime.png' },
  { name: 'TV / Cable (Izzi)', category: 'Servicios Básicos', defaultPrice: 650.00, code: 'IMG-08', logoUrl: '/img/servicios/izzi.png' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [showAppearanceMenu, setShowAppearanceMenu] = useState(false);
  const [cronNotification, setCronNotification] = useState<string | null>(null);

  const [userProfile, setUserProfile] = useState({
    name: 'Usuario Demo',
    email: 'usuario@dominio.com',
    phone: '55 0000 0000'
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: true
  });
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const [cards, setCards] = useState<PaymentCard[]>([
    { id: 'c1', bank: 'Banco Principal', brand: 'Visa', last4: '4582', expiry: '08/28', holder: 'USUARIO DEMO', isDefault: true },
    { id: 'c2', bank: 'Tarjeta Secundaria', brand: 'Mastercard', last4: '9104', expiry: '11/29', holder: 'USUARIO DEMO', isDefault: false }
  ]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: '1', name: 'Servicio Eléctrico (CFE)', price: 450.00, renewalDate: '2026-11-15', cutoffDay: 15, category: 'Servicios Básicos', code: 'IMG-01', logoUrl: '/img/servicios/cfe.png', autoPay: true, cardLast4: '4582', status: 'Activa' },
    { id: '2', name: 'Netflix', price: 219.00, renewalDate: '2026-11-20', cutoffDay: 20, category: 'Streaming', code: 'IMG-04', logoUrl: '/img/servicios/netflix.png', autoPay: true, cardLast4: '4582', status: 'Activa' },
    { id: '3', name: 'Plan Móvil (Telcel)', price: 399.00, renewalDate: '2026-11-18', cutoffDay: 18, category: 'Telecomunicaciones', code: 'IMG-02', logoUrl: '/img/servicios/telcel.png', autoPay: true, cardLast4: '9104', status: 'Activa' },
    { id: '4', name: 'Spotify', price: 129.00, renewalDate: '2026-11-25', cutoffDay: 25, category: 'Streaming', code: 'IMG-05', logoUrl: '/img/servicios/spotify.png', autoPay: true, cardLast4: '4582', status: 'Activa' }
  ]);

  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([
    { id: 'tx-101', serviceName: 'Servicio Eléctrico (CFE)', amount: 450.00, date: '15/10/2026', status: 'Aprobado', method: 'Tarjeta •••• 4582', reference: 'REF-001', code: 'IMG-01' },
    { id: 'tx-102', serviceName: 'Plan Móvil (Telcel)', amount: 399.00, date: '18/10/2026', status: 'Aprobado', method: 'Tarjeta •••• 9104', reference: 'REF-002', code: 'IMG-02' },
    { id: 'tx-103', serviceName: 'Netflix', amount: 219.00, date: '20/10/2026', status: 'Aprobado', method: 'Tarjeta •••• 4582', reference: 'REF-003', code: 'IMG-04' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Recordatorio: Próximo cargo de Servicio Eléctrico ($450)', time: 'Hace 2h', type: 'reminder' },
    { id: '2', title: 'Pago procesado: Netflix ($219.00)', time: 'Ayer', type: 'payment' }
  ]);

  const [newSub, setNewSub] = useState({
    name: '',
    price: '',
    renewalDate: '2026-11-15',
    cutoffDay: '15',
    category: 'Streaming',
    code: 'IMG-00',
    cardLast4: '4582',
    autoPay: true
  });

  const [newCard, setNewCard] = useState({ bank: '', number: '', expiry: '', cvv: '', holder: '' });
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  const activeSubs = subscriptions.filter(s => s.status === 'Activa');
  const totalMonthly = activeSubs.reduce((sum, sub) => sum + sub.price, 0);

  const onboardingSteps = [
    {
      title: '1. Registro de Servicios',
      description: 'Vista previa del módulo para dar de alta pagos recurrentes y fechas de corte.',
      stepLabel: 'MÓDULO 01'
    },
    {
      title: '2. Programación Automática',
      description: 'Simulación del proceso en segundo plano que ejecuta los cobros mensuales.',
      stepLabel: 'MÓDULO 02'
    },
    {
      title: '3. Historial y Control',
      description: 'Consulta de movimientos realizados y estado de cada suscripción.',
      stepLabel: 'MÓDULO 03'
    }
  ];

  const handleRegisterSubmit = () => {
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.password.trim()) {
      setRegisterError('Completa los campos requeridos (*).');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('Las contraseñas no coinciden.');
      return;
    }
    setRegisterError('');
    setUserProfile({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone || '55 0000 0000'
    });
    setCurrentScreen('dashboard');
  };

  const handleSelectCatalogItem = (item: CatalogItem) => {
    setNewSub({
      name: item.name,
      price: item.defaultPrice.toString(),
      renewalDate: '2026-11-15',
      cutoffDay: '15',
      category: item.category,
      code: item.code,
      cardLast4: cards[0]?.last4 || '4582',
      autoPay: true
    });
    setCurrentScreen('add');
  };

  const handleAddSubscription = () => {
    if (newSub.name && newSub.price) {
      const subscription: Subscription = {
        id: Date.now().toString(),
        name: newSub.name,
        price: parseFloat(newSub.price),
        renewalDate: newSub.renewalDate || '2026-11-15',
        cutoffDay: parseInt(newSub.cutoffDay) || 15,
        category: newSub.category,
        code: newSub.code,
        autoPay: newSub.autoPay,
        cardLast4: newSub.cardLast4,
        status: 'Activa'
      };
      setSubscriptions([subscription, ...subscriptions]);
      setCurrentScreen('dashboard');
    }
  };

  const handleToggleSubStatus = (id: string) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === id) {
        const nextStatus = sub.status === 'Activa' ? 'Pausada' : 'Activa';
        return { ...sub, status: nextStatus, autoPay: nextStatus === 'Activa' };
      }
      return sub;
    }));
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  const handleSimulateCronJob = () => {
    if (activeSubs.length === 0) return;
    const targetSub = activeSubs[0];
    const newTx: PaymentRecord = {
      id: 'tx-' + Math.floor(Math.random() * 900 + 100),
      serviceName: targetSub.name,
      amount: targetSub.price,
      date: 'Hoy (Simulación)',
      status: 'Aprobado',
      method: `Tarjeta •••• ${targetSub.cardLast4}`,
      reference: 'SIM-' + Math.floor(Math.random() * 9000 + 1000),
      code: targetSub.code
    };
    setPaymentHistory([newTx, ...paymentHistory]);
    setCronNotification(`Simulación: Pago registrado para ${targetSub.name} ($${targetSub.price.toFixed(2)})`);
    setTimeout(() => setCronNotification(null), 3500);
  };

  const handleAddCard = () => {
    if (newCard.bank && newCard.number.length >= 4) {
      const last4 = newCard.number.slice(-4);
      const cardObj: PaymentCard = {
        id: 'c-' + Date.now(),
        bank: newCard.bank,
        brand: newCard.number.startsWith('4') ? 'Visa' : 'Mastercard',
        last4,
        expiry: newCard.expiry || '12/29',
        holder: (newCard.holder || userProfile.name).toUpperCase(),
        isDefault: cards.length === 0
      };
      setCards([...cards, cardObj]);
      setNewCard({ bank: '', number: '', expiry: '', cvv: '', holder: '' });
      setShowAddCardModal(false);
    }
  };

  const categoryData = activeSubs.reduce((acc, sub) => {
    const existing = acc.find(item => item.name === sub.category);
    if (existing) {
      existing.value += sub.price;
    } else {
      acc.push({ name: sub.category, value: sub.price });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const COLORS = ['#334155', '#64748B', '#94A3B8', '#475569'];

  const monthlyTrendData = [
    { month: 'Ago', amount: 1100 },
    { month: 'Sep', amount: 1150 },
    { month: 'Oct', amount: 1197 },
    { month: 'Nov', amount: totalMonthly }
  ];

  // Encabezado sobrio de prototipo sin botones de cambio de tema expuestos
  const PrototypeHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="border-b-2 border-border pb-3 mb-4 flex items-center justify-between">
      <div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
          [PROTOTIPO UI]
        </span>
        <h1 className="text-lg font-bold text-foreground">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentScreen('notifications')}
          className="p-2 rounded-lg border-2 border-border bg-accent/50 text-foreground"
          title="Alertas"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderSplash = () => (
    <div className="flex flex-col items-center justify-center h-full bg-background text-foreground text-center p-6">
      <div className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-xs font-mono text-muted-foreground mb-4">
        [LOGO APP]
      </div>
      <h1 className="text-2xl font-bold mb-1">Gestor de Suscripciones</h1>
      <p className="text-xs text-muted-foreground mb-8">Prototipo Funcional de Interfaz</p>
      <Button onClick={() => setCurrentScreen('onboarding')}>
        Iniciar Recorrido
      </Button>
    </div>
  );

  const renderOnboarding = () => (
    <div className="flex flex-col h-full p-6 bg-background text-foreground">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="w-28 h-28 rounded-lg border-2 border-dashed border-border bg-accent/40 flex items-center justify-center text-xs font-mono text-muted-foreground mb-6">
          [{onboardingSteps[onboardingStep].stepLabel}]
        </div>
        <h2 className="text-xl font-bold mb-2 text-center text-foreground">{onboardingSteps[onboardingStep].title}</h2>
        <p className="text-center text-sm text-muted-foreground mb-6">
          {onboardingSteps[onboardingStep].description}
        </p>
        <div className="flex gap-2 mb-6">
          {onboardingSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full ${
                idx === onboardingStep ? 'w-6 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {onboardingStep > 0 && (
          <Button variant="outline" onClick={() => setOnboardingStep(onboardingStep - 1)}>
            Anterior
          </Button>
        )}
        <Button
          className="flex-1"
          onClick={() => {
            if (onboardingStep < 2) {
              setOnboardingStep(onboardingStep + 1);
            } else {
              setCurrentScreen('login');
            }
          }}
        >
          {onboardingStep === 2 ? 'Ir a Acceso' : 'Siguiente'}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="flex flex-col h-full p-6 bg-background text-foreground overflow-y-auto">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-4">
        <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border bg-accent/40 flex items-center justify-center text-[10px] font-mono text-muted-foreground mx-auto mb-4">
          [ICONO]
        </div>
        <h2 className="text-xl font-bold mb-1 text-center text-foreground">Inicio de Sesión</h2>
        <p className="text-center text-xs text-muted-foreground mb-6">Vista previa de acceso al sistema</p>

        <div className="space-y-3.5">
          <Input label="Correo Electrónico" type="email" placeholder="usuario@dominio.com" defaultValue={userProfile.email} />
          <Input label="Contraseña" type="password" placeholder="••••••••" defaultValue="12345678" />

          <Button className="w-full" onClick={() => setCurrentScreen('dashboard')}>
            Entrar al Sistema
          </Button>

          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setCurrentScreen('register')}
          >
            <UserPlus className="w-4 h-4" />
            Ir a Pantalla de Registro
          </Button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">Opciones externas</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={() => setCurrentScreen('dashboard')}>
            [G] Acceder con Cuenta Google
          </Button>
        </div>
      </div>
    </div>
  );

  const renderRegister = () => (
    <div className="flex flex-col h-full p-6 bg-background text-foreground overflow-y-auto">
      <div className="flex items-center justify-between border-b-2 border-border pb-3 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('login')}>
          ← Volver
        </Button>
        <span className="text-xs font-mono text-muted-foreground">[VISTA: REGISTRO]</span>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full pb-4">
        <h2 className="text-lg font-bold text-foreground mb-1">Registro de Nuevo Usuario</h2>
        <p className="text-xs text-muted-foreground mb-4">Formulario prototipo para creación de perfil</p>

        {registerError && (
          <div className="mb-3 p-2.5 rounded-lg border-2 border-destructive bg-destructive/10 text-destructive text-xs">
            {registerError}
          </div>
        )}

        <div className="space-y-3">
          <Input
            label="Nombre Completo *"
            type="text"
            placeholder="Nombre y Apellidos"
            value={registerForm.name}
            onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
          />

          <Input
            label="Correo Electrónico *"
            type="email"
            placeholder="usuario@correo.com"
            value={registerForm.email}
            onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
          />

          <Input
            label="Teléfono de Contacto"
            type="tel"
            placeholder="55 0000 0000"
            value={registerForm.phone}
            onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2.5">
            <Input
              label="Contraseña *"
              type="password"
              placeholder="••••••••"
              value={registerForm.password}
              onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
            <Input
              label="Confirmar *"
              type="password"
              placeholder="••••••••"
              value={registerForm.confirmPassword}
              onChange={e => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
            />
          </div>

          <Card className="p-3 bg-accent/40 flex items-start gap-2">
            <input
              type="checkbox"
              checked={registerForm.acceptTerms}
              onChange={e => setRegisterForm({ ...registerForm, acceptTerms: e.target.checked })}
              className="mt-0.5 w-4 h-4 accent-primary"
            />
            <p className="text-xs text-muted-foreground">
              Acepto términos de uso y programación de cobros automáticos.
            </p>
          </Card>

          <Button className="w-full mt-2" onClick={handleRegisterSubmit}>
            <Check className="w-4 h-4" />
            Completar Registro
          </Button>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Panel Principal" subtitle={`Usuario: ${userProfile.name}`} />

        {cronNotification && (
          <div className="mb-4 p-2.5 rounded-lg border-2 border-primary bg-accent text-foreground text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{cronNotification}</span>
          </div>
        )}

        {/* Resumen sobrio estilo wireframe/prototipo */}
        <Card className="p-4 mb-4 bg-accent/50">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-mono">Gasto Mensual Programado</p>
              <h2 className="text-2xl font-bold mt-0.5 text-card-foreground">${totalMonthly.toFixed(2)} MXN</h2>
            </div>
            <span className="px-2 py-0.5 border border-border bg-card rounded text-[10px] font-mono text-muted-foreground">
              ESTADO: ACTIVO
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border mt-2">
            <span>Suscripciones activas: {activeSubs.length}</span>
            <button
              onClick={() => setCurrentScreen('analytics')}
              className="underline font-medium text-foreground"
            >
              Ver reporte gráfico →
            </button>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button size="sm" onClick={() => setCurrentScreen('catalog')}>
            <Plus className="w-3.5 h-3.5" />
            Agregar Servicio
          </Button>
          <Button size="sm" variant="outline" onClick={handleSimulateCronJob}>
            <Play className="w-3.5 h-3.5" />
            Simular Fecha Corte
          </Button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-foreground">Servicios Registrados</h3>
          <button
            onClick={() => setCurrentScreen('calendar')}
            className="text-xs underline text-muted-foreground"
          >
            Ver Calendario
          </button>
        </div>

        <div className="space-y-2.5">
          {subscriptions.map(sub => (
            <Card key={sub.id} className={`p-3 ${sub.status === 'Pausada' ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded border-2 border-dashed border-border bg-accent/40 flex items-center justify-center text-[10px] font-mono text-muted-foreground shrink-0">
                  [{sub.code}]
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm truncate text-card-foreground">{sub.name}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-accent text-accent-foreground font-mono">
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Corte: Día {sub.cutoffDay} • Tarjeta •••• {sub.cardLast4}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-card-foreground">${sub.price.toFixed(2)}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <button
                      onClick={() => handleToggleSubStatus(sub.id)}
                      className="text-[10px] px-2 py-0.5 rounded border border-border bg-accent hover:bg-muted text-accent-foreground"
                    >
                      {sub.status === 'Activa' ? 'Pausar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => handleDeleteSubscription(sub.id)}
                      className="text-destructive p-1 hover:bg-destructive/10 rounded"
                      title="Eliminar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderCatalog = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Catálogo de Servicios" subtitle="Plantillas para alta rápida" />

        <Card className="p-2.5 mb-3 bg-accent/40 border-dashed flex items-center gap-2 text-xs text-muted-foreground">
          <Folder className="w-4 h-4 shrink-0" />
          <span>Ruta de imágenes del catálogo: <code className="font-mono text-foreground">public/img/servicios/</code></span>
        </Card>

        <div className="grid grid-cols-2 gap-2.5 mb-4">
          {SERVICE_CATALOG.map((item, idx) => (
            <Card
              key={idx}
              hover
              onClick={() => handleSelectCatalogItem(item)}
              className="p-3 flex flex-col items-center text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded border-2 border-dashed border-border bg-accent/40 flex items-center justify-center text-[10px] font-mono text-muted-foreground mb-2">
                [{item.code}]
              </div>
              <h4 className="font-semibold text-xs mb-0.5 text-card-foreground">{item.name}</h4>
              <p className="text-[10px] text-muted-foreground mb-1.5">{item.category}</p>
              <span className="text-[11px] font-mono border border-border px-2 py-0.5 rounded bg-accent/50 text-card-foreground">
                ${item.defaultPrice} MXN
              </span>
            </Card>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={() => setCurrentScreen('add')}>
          + Capturar Servicio Manualmente
        </Button>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderAddSubscription = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Configurar Pago" subtitle="Alta de suscripción o servicio" />

        <div className="space-y-3.5 max-w-md mx-auto">
          <Input
            label="Nombre del Servicio"
            placeholder="Ej. Servicio Eléctrico, Netflix..."
            value={newSub.name}
            onChange={e => setNewSub({ ...newSub, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2.5">
            <Input
              label="Monto ($ MXN)"
              type="number"
              placeholder="0.00"
              value={newSub.price}
              onChange={e => setNewSub({ ...newSub, price: e.target.value })}
            />
            <Input
              label="Día de Corte (1-31)"
              type="number"
              min={1}
              max={31}
              placeholder="15"
              value={newSub.cutoffDay}
              onChange={e => setNewSub({ ...newSub, cutoffDay: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-medium text-foreground/90">Categoría</label>
            <select
              className="w-full px-3.5 py-2.5 rounded-lg bg-input-background text-foreground border-2 border-border text-sm"
              value={newSub.category}
              onChange={e => setNewSub({ ...newSub, category: e.target.value })}
            >
              <option>Servicios Básicos</option>
              <option>Streaming</option>
              <option>Telecomunicaciones</option>
              <option>Educación</option>
              <option>Otros</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-medium text-foreground/90">Método de Pago Asociado</label>
            <select
              className="w-full px-3.5 py-2.5 rounded-lg bg-input-background text-foreground border-2 border-border text-sm"
              value={newSub.cardLast4}
              onChange={e => setNewSub({ ...newSub, cardLast4: e.target.value })}
            >
              {cards.map(c => (
                <option key={c.id} value={c.last4}>
                  {c.bank} ({c.brand} •••• {c.last4})
                </option>
              ))}
            </select>
          </div>

          <Card className="p-3 bg-accent/40 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-card-foreground">Ejecución Automática</p>
              <p className="text-[11px] text-muted-foreground">Realizar cargo automáticamente en el día de corte</p>
            </div>
            <input
              type="checkbox"
              checked={newSub.autoPay}
              onChange={e => setNewSub({ ...newSub, autoPay: e.target.checked })}
              className="w-4 h-4 accent-primary"
            />
          </Card>

          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setCurrentScreen('catalog')}>
              Cancelar
            </Button>
            <Button className="flex-1" onClick={handleAddSubscription}>
              Guardar
            </Button>
          </div>
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderHistory = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Historial de Pagos" subtitle="Registro de transacciones" />

        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground">Total: {paymentHistory.length} registros</span>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <FileText className="w-3.5 h-3.5" /> Vista PDF
          </Button>
        </div>

        <div className="space-y-2.5">
          {paymentHistory.map(tx => (
            <Card key={tx.id} className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded border-2 border-dashed border-border bg-accent/40 flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                  [{tx.code}]
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm text-card-foreground">{tx.serviceName}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-border bg-accent text-accent-foreground font-mono">
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{tx.method}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{tx.date} • {tx.reference}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-card-foreground">-${tx.amount.toFixed(2)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderCards = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Métodos de Pago" subtitle="Tarjetas vinculadas" />

        <Button size="sm" className="mb-4" onClick={() => setShowAddCardModal(!showAddCardModal)}>
          <Plus className="w-3.5 h-3.5" /> Agregar Tarjeta
        </Button>

        {showAddCardModal && (
          <Card className="p-4 mb-4">
            <h3 className="text-xs font-bold uppercase font-mono mb-3 text-card-foreground">[Formulario Nueva Tarjeta]</h3>
            <div className="space-y-2.5">
              <Input
                label="Nombre del Banco"
                placeholder="Ej. Banco Demo"
                value={newCard.bank}
                onChange={e => setNewCard({ ...newCard, bank: e.target.value })}
              />
              <Input
                label="Últimos dígitos / Número"
                placeholder="0000 0000 0000 1234"
                maxLength={16}
                value={newCard.number}
                onChange={e => setNewCard({ ...newCard, number: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Vigencia"
                  placeholder="MM/AA"
                  value={newCard.expiry}
                  onChange={e => setNewCard({ ...newCard, expiry: e.target.value })}
                />
                <Input
                  label="CVV"
                  type="password"
                  placeholder="•••"
                  maxLength={4}
                  value={newCard.cvv}
                  onChange={e => setNewCard({ ...newCard, cvv: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowAddCardModal(false)}>
                  Cancelar
                </Button>
                <Button size="sm" className="flex-1" onClick={handleAddCard}>
                  Guardar
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-3">
          {cards.map(card => (
            <Card key={card.id} className="p-4 bg-accent/30">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-card-foreground">{card.bank}</span>
                <span className="text-xs px-2 py-0.5 rounded border border-border bg-card font-mono text-card-foreground">
                  {card.brand}
                </span>
              </div>
              <p className="text-base font-mono tracking-widest mb-3 text-card-foreground">
                •••• •••• •••• {card.last4}
              </p>
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>Titular: {card.holder}</span>
                <span>Vence: {card.expiry}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderCalendar = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Calendario de Corte" subtitle="Vista mensual de cobros" />

        <Card className="p-3.5 mb-4">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, idx) => (
              <div key={idx} className="text-center text-xs text-muted-foreground py-1 font-bold">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const date = i + 1;
              const subOnDay = activeSubs.find(sub => sub.cutoffDay === date);

              return (
                <div
                  key={i}
                  className={`aspect-square flex flex-col items-center justify-center rounded border text-xs ${
                    subOnDay
                      ? 'bg-primary text-primary-foreground border-primary font-bold'
                      : 'border-transparent hover:border-border text-card-foreground'
                  }`}
                >
                  <span>{date}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <Button variant="outline" size="sm" onClick={() => setCurrentScreen('dashboard')}>
          ← Volver al Panel
        </Button>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderAnalytics = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Gráficas de Gasto" subtitle="Boceto de visualización mensual" />

        <Card className="p-4 mb-4">
          <h3 className="text-xs font-bold uppercase font-mono mb-2 text-card-foreground">Gasto por Categoría</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={60}
                fill="#475569"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs text-card-foreground">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{cat.name}</span>
                <span className="font-mono ml-auto">${cat.value.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h3 className="text-xs font-bold uppercase font-mono mb-2 text-card-foreground">Tendencia Mensual</h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#CBD5E1'} />
              <XAxis dataKey="month" stroke={darkMode ? '#94A3B8' : '#64748B'} fontSize={11} />
              <YAxis stroke={darkMode ? '#94A3B8' : '#64748B'} fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke={darkMode ? '#94A3B8' : '#334155'} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderNotifications = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Bandeja de Alertas" subtitle="Notificaciones preventivas" />

        <div className="space-y-2.5">
          {notifications.map(notif => (
            <Card key={notif.id} className="p-3.5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded border border-border bg-accent flex items-center justify-center shrink-0">
                  {notif.type === 'reminder' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-xs mb-0.5 text-card-foreground">{notif.title}</h4>
                  <p className="text-[11px] text-muted-foreground">{notif.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  // Pantalla de Menú General donde está escondido el botón de cambio de tema dentro de un submenú desplegable
  const renderProfile = () => (
    <div className="flex flex-col h-full bg-background text-foreground">
      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <PrototypeHeader title="Menú del Sistema" subtitle="Navegación secundaria y ajustes" />

        <Card className="p-4 mb-4 bg-accent/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded border-2 border-dashed border-border bg-card flex items-center justify-center text-xs font-mono text-muted-foreground">
              [USER]
            </div>
            <div>
              <h3 className="text-sm font-bold text-card-foreground">{userProfile.name}</h3>
              <p className="text-xs text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>
        </Card>

        <div className="space-y-2.5">
          <Card hover className="p-3.5 flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('analytics')}>
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-card-foreground">Módulo de Gráficas</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>

          <Card hover className="p-3.5 flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('calendar')}>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-card-foreground">Calendario de Pagos</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>

          <Card hover className="p-3.5 flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('register')}>
            <div className="flex items-center gap-2.5">
              <UserPlus className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-card-foreground">Vista: Registro de Usuario</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Card>

          {/* Submenú colapsable donde se esconde el botón de cambio de tema */}
          <Card className="overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAppearanceMenu(!showAppearanceMenu)}
              className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-accent/50"
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-card-foreground">Preferencias de Interfaz</span>
              </div>
              {showAppearanceMenu ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
            </button>

            {showAppearanceMenu && (
              <div className="p-3.5 pt-2 border-t border-border bg-accent/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {darkMode ? <Moon className="w-4 h-4 text-foreground" /> : <Sun className="w-4 h-4 text-foreground" />}
                  <span className="text-xs text-card-foreground">
                    Tema Oscuro ({darkMode ? 'Activo' : 'Inactivo'})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-10 h-5 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-switch-background'} relative cursor-pointer`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            )}
          </Card>

          <Card hover className="p-3.5 flex items-center gap-2.5 text-destructive cursor-pointer" onClick={() => setCurrentScreen('login')}>
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Salir a Login</span>
          </Card>
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  return (
    <div className={`${darkMode ? 'dark' : ''} size-full flex items-center justify-center bg-background text-foreground transition-colors duration-150`}>
      <div className="w-full max-w-md h-full bg-card text-card-foreground border-x-2 border-border overflow-hidden relative">
        {currentScreen === 'splash' && renderSplash()}
        {currentScreen === 'onboarding' && renderOnboarding()}
        {currentScreen === 'login' && renderLogin()}
        {currentScreen === 'register' && renderRegister()}
        {currentScreen === 'dashboard' && renderDashboard()}
        {currentScreen === 'catalog' && renderCatalog()}
        {currentScreen === 'add' && renderAddSubscription()}
        {currentScreen === 'history' && renderHistory()}
        {currentScreen === 'cards' && renderCards()}
        {currentScreen === 'calendar' && renderCalendar()}
        {currentScreen === 'analytics' && renderAnalytics()}
        {currentScreen === 'notifications' && renderNotifications()}
        {currentScreen === 'profile' && renderProfile()}
      </div>
    </div>
  );
}

function BottomNav({ currentScreen, setCurrentScreen }: { currentScreen: Screen; setCurrentScreen: (screen: Screen) => void }) {
  const navItems = [
    { icon: Home, label: 'Inicio', screen: 'dashboard' as Screen },
    { icon: Plus, label: 'Catálogo', screen: 'catalog' as Screen },
    { icon: History, label: 'Historial', screen: 'history' as Screen },
    { icon: CreditCard, label: 'Tarjetas', screen: 'cards' as Screen },
    { icon: Menu, label: 'Menú', screen: 'profile' as Screen }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card text-card-foreground border-t-2 border-border z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen || (item.screen === 'catalog' && currentScreen === 'add');
          return (
            <button
              key={item.screen}
              onClick={() => setCurrentScreen(item.screen)}
              className="flex flex-col items-center gap-0.5 transition-colors px-2 py-1 cursor-pointer"
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[10px] ${isActive ? 'text-primary font-bold underline' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
