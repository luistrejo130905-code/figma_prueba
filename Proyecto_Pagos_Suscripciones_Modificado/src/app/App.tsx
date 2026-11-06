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
  User,
  CreditCard,
  DollarSign,
  ArrowRight,
  Check,
  Trash2,
  Moon,
  Sun,
  LogOut,
  History,
  Zap,
  ShieldCheck,
  Play,
  FileText,
  XCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Screen =
  | 'splash'
  | 'onboarding'
  | 'login'
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
  color: string;
  icon: string;
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
  status: 'Aprobado' | 'Programado' | 'Rechazado';
  method: string;
  reference: string;
  icon: string;
}

interface PaymentCard {
  id: string;
  bank: string;
  brand: 'Visa' | 'Mastercard';
  last4: string;
  expiry: string;
  holder: string;
  isDefault: boolean;
  color: string;
}

interface CatalogItem {
  name: string;
  category: string;
  defaultPrice: number;
  color: string;
  icon: string;
  logoUrl: string;
}

const SERVICE_CATALOG: CatalogItem[] = [
  { name: 'Luz CFE', category: 'Hogar y Servicios', defaultPrice: 450.00, color: '#008E5A', icon: '⚡', logoUrl: '/img/servicios/cfe.png' },
  { name: 'Telcel Plan', category: 'Telecomunicaciones', defaultPrice: 399.00, color: '#0033A0', icon: '📱', logoUrl: '/img/servicios/telcel.png' },
  { name: 'Telmex Infinitum', category: 'Hogar y Servicios', defaultPrice: 499.00, color: '#0072CE', icon: '🌐', logoUrl: '/img/servicios/telmex.png' },
  { name: 'Netflix', category: 'Entretenimiento', defaultPrice: 219.00, color: '#E50914', icon: '📺', logoUrl: '/img/servicios/netflix.png' },
  { name: 'Spotify Premium', category: 'Entretenimiento', defaultPrice: 129.00, color: '#1DB954', icon: '🎵', logoUrl: '/img/servicios/spotify.png' },
  { name: 'Disney+', category: 'Entretenimiento', defaultPrice: 179.00, color: '#113CCF', icon: '🎬', logoUrl: '/img/servicios/disney.png' },
  { name: 'Amazon Prime', category: 'Entretenimiento', defaultPrice: 99.00, color: '#00A8E1', icon: '📦', logoUrl: '/img/servicios/prime.png' },
  { name: 'Izzi / Totalplay', category: 'Hogar y Servicios', defaultPrice: 650.00, color: '#FF5A00', icon: '📡', logoUrl: '/img/servicios/izzi.png' },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [cronNotification, setCronNotification] = useState<string | null>(null);

  const [cards, setCards] = useState<PaymentCard[]>([
    { id: 'c1', bank: 'BBVA México', brand: 'Visa', last4: '4582', expiry: '08/28', holder: 'LUIS TREJO', isDefault: true, color: 'from-blue-700 to-indigo-900' },
    { id: 'c2', bank: 'Nu México / Mercado Pago', brand: 'Mastercard', last4: '9104', expiry: '11/29', holder: 'LUIS TREJO', isDefault: false, color: 'from-purple-700 to-fuchsia-900' }
  ]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { id: '1', name: 'Luz CFE', price: 450.00, renewalDate: '2026-11-15', cutoffDay: 15, category: 'Hogar y Servicios', color: '#008E5A', icon: '⚡', logoUrl: '/img/servicios/cfe.png', autoPay: true, cardLast4: '4582', status: 'Activa' },
    { id: '2', name: 'Netflix', price: 219.00, renewalDate: '2026-11-20', cutoffDay: 20, category: 'Entretenimiento', color: '#E50914', icon: '📺', logoUrl: '/img/servicios/netflix.png', autoPay: true, cardLast4: '4582', status: 'Activa' },
    { id: '3', name: 'Telcel Plan', price: 399.00, renewalDate: '2026-11-18', cutoffDay: 18, category: 'Telecomunicaciones', color: '#0033A0', icon: '📱', logoUrl: '/img/servicios/telcel.png', autoPay: true, cardLast4: '9104', status: 'Activa' },
    { id: '4', name: 'Spotify Premium', price: 129.00, renewalDate: '2026-11-25', cutoffDay: 25, category: 'Entretenimiento', color: '#1DB954', icon: '🎵', logoUrl: '/img/servicios/spotify.png', autoPay: true, cardLast4: '4582', status: 'Activa' },
    { id: '5', name: 'Telmex Infinitum', price: 499.00, renewalDate: '2026-11-28', cutoffDay: 28, category: 'Hogar y Servicios', color: '#0072CE', icon: '🌐', logoUrl: '/img/servicios/telmex.png', autoPay: true, cardLast4: '4582', status: 'Activa' }
  ]);

  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([
    { id: 'tx-101', serviceName: 'Luz CFE', amount: 450.00, date: '15 Oct 2026 - 08:00 AM', status: 'Aprobado', method: 'Visa •••• 4582 (Auto-Cron)', reference: 'AUT-99281', icon: '⚡' },
    { id: 'tx-102', serviceName: 'Telcel Plan', amount: 399.00, date: '18 Oct 2026 - 08:00 AM', status: 'Aprobado', method: 'Mastercard •••• 9104 (Auto-Cron)', reference: 'AUT-99340', icon: '📱' },
    { id: 'tx-103', serviceName: 'Netflix', amount: 219.00, date: '20 Oct 2026 - 08:00 AM', status: 'Aprobado', method: 'Visa •••• 4582 (Auto-Cron)', reference: 'AUT-99512', icon: '📺' },
    { id: 'tx-104', serviceName: 'Spotify Premium', amount: 129.00, date: '25 Oct 2026 - 08:00 AM', status: 'Aprobado', method: 'Visa •••• 4582 (Auto-Cron)', reference: 'AUT-99801', icon: '🎵' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Cobro automático programado: Luz CFE ($450) el día 15', time: 'Hace 2 horas', type: 'reminder' },
    { id: '2', title: 'Pago automático exitoso: Telmex Infinitum ($499.00)', time: 'Hace 1 día', type: 'payment' },
    { id: '3', title: 'Tarjeta Visa •••• 4582 verificada con token seguro', time: 'Hace 2 días', type: 'payment' }
  ]);

  const [newSub, setNewSub] = useState({
    name: '',
    price: '',
    renewalDate: '2026-11-15',
    cutoffDay: '15',
    category: 'Entretenimiento',
    icon: '💳',
    color: '#5B67F1',
    cardLast4: '4582',
    autoPay: true
  });

  const [newCard, setNewCard] = useState({ bank: '', number: '', expiry: '', cvv: '', holder: '' });
  const [showAddCardModal, setShowAddCardModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'splash') {
        setCurrentScreen('onboarding');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentScreen]);

  const activeSubs = subscriptions.filter(s => s.status === 'Activa');
  const totalMonthly = activeSubs.reduce((sum, sub) => sum + sub.price, 0);
  const totalYearly = totalMonthly * 12;

  const onboardingSteps = [
    {
      title: 'Gestiona tus Pagos Automáticos',
      description: 'Centraliza tus recibos de luz, internet y plataformas de streaming en un solo lugar.',
      icon: '⚡'
    },
    {
      title: 'Motor Automatizado de Cobros',
      description: 'Nuestro sistema ejecuta los pagos puntualmente en tu fecha de corte sin cargos extra.',
      icon: '🤖'
    },
    {
      title: 'Control Total y Auditoría',
      description: 'Pausa suscripciones con un toque, revisa tu historial y recibe alertas antes de cada cargo.',
      icon: '🛡️'
    }
  ];

  const handleSelectCatalogItem = (item: CatalogItem) => {
    setNewSub({
      name: item.name,
      price: item.defaultPrice.toString(),
      renewalDate: '2026-11-15',
      cutoffDay: '15',
      category: item.category,
      icon: item.icon,
      color: item.color,
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
        color: newSub.color,
        icon: newSub.icon,
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
      id: 'tx-' + Math.floor(Math.random() * 9000 + 1000),
      serviceName: targetSub.name,
      amount: targetSub.price,
      date: 'Hoy, 06 Nov 2026 - 11:15 AM',
      status: 'Aprobado',
      method: `Tarjeta •••• ${targetSub.cardLast4} (Cron Job)`,
      reference: 'AUT-' + Math.floor(Math.random() * 90000 + 10000),
      icon: targetSub.icon
    };
    setPaymentHistory([newTx, ...paymentHistory]);
    setNotifications([
      { id: Date.now().toString(), title: `Cobro automático ejecutado: ${targetSub.name} ($${targetSub.price.toFixed(2)} MXN)`, time: 'Justo ahora', type: 'payment' },
      ...notifications
    ]);
    setCronNotification(`✅ Cron Job ejecutado: Se procesó el pago automático de ${targetSub.name} ($${targetSub.price.toFixed(2)} MXN)`);
    setTimeout(() => setCronNotification(null), 4000);
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
        holder: (newCard.holder || 'USUARIO').toUpperCase(),
        isDefault: cards.length === 0,
        color: 'from-emerald-700 to-teal-900'
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

  const COLORS = ['#5B67F1', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

  const monthlyTrendData = [
    { month: 'Jul', amount: 1420 },
    { month: 'Ago', amount: 1550 },
    { month: 'Sep', amount: 1490 },
    { month: 'Oct', amount: 1680 },
    { month: 'Nov', amount: totalMonthly }
  ];

  const renderSplash = () => (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-primary via-secondary to-primary animate-gradient-x text-center p-6">
      <div className="text-6xl mb-4">💳</div>
      <h1 className="text-white text-4xl font-bold mb-2">SubPay MX</h1>
      <p className="text-white/80">Gestor de Pagos Automáticos y Suscripciones</p>
      <Button variant="outline" className="mt-8 bg-white/10 text-white border-white/30" onClick={() => setCurrentScreen('onboarding')}>
        Comenzar
      </Button>
    </div>
  );

  const renderOnboarding = () => (
    <div className="flex flex-col h-full p-8 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="text-7xl mb-8">{onboardingSteps[onboardingStep].icon}</div>
        <h2 className="text-2xl font-bold mb-4 text-center">{onboardingSteps[onboardingStep].title}</h2>
        <p className="text-center text-muted-foreground mb-8">
          {onboardingSteps[onboardingStep].description}
        </p>
        <div className="flex gap-2 mb-8">
          {onboardingSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === onboardingStep ? 'w-8 bg-primary' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        {onboardingStep > 0 && (
          <Button variant="outline" onClick={() => setOnboardingStep(onboardingStep - 1)}>
            Atrás
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
          {onboardingStep === 2 ? 'Ir al Login' : 'Siguiente'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  const renderLogin = () => (
    <div className="flex flex-col h-full p-8 bg-background">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-5xl mb-3 text-center">⚡💳</div>
        <h2 className="text-2xl font-bold mb-1 text-center">Bienvenido a SubPay</h2>
        <p className="text-center text-sm text-muted-foreground mb-6">Automatiza tus servicios y suscripciones</p>

        <div className="space-y-4">
          <Input label="Correo Electrónico" type="email" placeholder="usuario@ejemplo.com" defaultValue="luis.trejo@ejemplo.mx" />
          <Input label="Contraseña" type="password" placeholder="••••••••" defaultValue="12345678" />
          <Button className="w-full" onClick={() => setCurrentScreen('dashboard')}>
            Iniciar Sesión
          </Button>

          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">o accede rápido con</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button variant="outline" className="w-full" onClick={() => setCurrentScreen('dashboard')}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          ¿No tienes cuenta? <span className="text-primary font-medium cursor-pointer" onClick={() => setCurrentScreen('dashboard')}>Regístrate aquí</span>
        </p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Mis Pagos Automáticos</h1>
            <p className="text-xs text-muted-foreground">Motor de cobros activo • MXN</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen('notifications')}
              className="p-2 rounded-full bg-accent relative"
              title="Notificaciones"
            >
              <Bell className="w-5 h-5 text-foreground" />
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-1 right-1" />
            </button>
            <div
              onClick={() => setCurrentScreen('profile')}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-sm font-bold cursor-pointer"
            >
              LT
            </div>
          </div>
        </div>

        {cronNotification && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{cronNotification}</span>
          </div>
        )}

        <Card className="p-5 mb-5 bg-gradient-to-br from-primary to-secondary text-white border-0 shadow-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-xs opacity-90">Total Comprometido del Mes</p>
              <h2 className="text-3xl font-bold mt-1">${totalMonthly.toFixed(2)} <span className="text-sm font-normal">MXN</span></h2>
            </div>
            <span className="px-2.5 py-1 bg-white/20 rounded-full text-xs flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Auto-Pay ON
            </span>
          </div>
          <div className="flex items-center justify-between text-xs opacity-90 pt-3 border-t border-white/20 mt-3">
            <span>Proyección anual: ${totalYearly.toFixed(2)}</span>
            <button
              onClick={() => setCurrentScreen('analytics')}
              className="underline font-medium flex items-center gap-1"
            >
              Ver gráficas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </Card>

        {/* Acciones rápidas del MVP */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <Button
            size="sm"
            onClick={() => setCurrentScreen('catalog')}
            className="text-xs py-2.5"
          >
            <Plus className="w-4 h-4" />
            Catálogo de Servicios
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSimulateCronJob}
            className="text-xs py-2.5 border-primary/40 text-primary"
          >
            <Play className="w-4 h-4" />
            Simular Cobro (Cron)
          </Button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold">Suscripciones y Servicios ({subscriptions.length})</h3>
          <button
            onClick={() => setCurrentScreen('calendar')}
            className="text-xs text-primary font-medium flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" /> Calendario
          </button>
        </div>

        <div className="space-y-3">
          {subscriptions.map(sub => (
            <Card key={sub.id} hover className={`p-3.5 transition-opacity ${sub.status === 'Pausada' ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ backgroundColor: sub.color + '20' }}
                >
                  {sub.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm truncate">{sub.name}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      sub.status === 'Activa' ? 'bg-emerald-500/15 text-emerald-600' : 'bg-amber-500/15 text-amber-600'
                    }`}>
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Día de corte: <span className="font-medium text-foreground">Día {sub.cutoffDay}</span> • Tarjeta •••• {sub.cardLast4}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${sub.price.toFixed(2)}</p>
                  <div className="flex items-center justify-end gap-1.5 mt-1">
                    <button
                      onClick={() => handleToggleSubStatus(sub.id)}
                      className="text-[11px] px-2 py-0.5 rounded bg-accent hover:bg-accent/80 text-foreground"
                      title="Pausar o Reactivar cobro automático"
                    >
                      {sub.status === 'Activa' ? 'Pausar' : 'Activar'}
                    </button>
                    <button
                      onClick={() => handleDeleteSubscription(sub.id)}
                      className="text-destructive p-1 hover:bg-destructive/10 rounded"
                      title="Cancelar domiciliación"
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
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">Catálogo de Servicios</h1>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('add')}>
            + Personalizado
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Selecciona un servicio precargado para programar su pago automático mensual.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {SERVICE_CATALOG.map((item, idx) => (
            <Card
              key={idx}
              hover
              onClick={() => handleSelectCatalogItem(item)}
              className="p-4 flex flex-col items-center text-center cursor-pointer border hover:border-primary"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-2.5 shadow-sm"
                style={{ backgroundColor: item.color + '18' }}
              >
                {item.icon}
              </div>
              <h4 className="font-semibold text-sm mb-0.5">{item.name}</h4>
              <p className="text-[11px] text-muted-foreground mb-2">{item.category}</p>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                Sugerido: ${item.defaultPrice}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderAddSubscription = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-5">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('catalog')}>
            ← Catálogo
          </Button>
          <h1 className="text-lg font-bold">Programar Suscripción</h1>
          <div className="w-12" />
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/50 border border-border">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-card shadow-sm">
              {newSub.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Configurando pago automático</p>
              <p className="font-semibold text-sm">{newSub.name || 'Nuevo Servicio'}</p>
            </div>
          </div>

          <Input
            label="Nombre del Servicio o Suscripción"
            placeholder="Ej. Luz CFE, Netflix, Telmex..."
            value={newSub.name}
            onChange={e => setNewSub({ ...newSub, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Monto Mensual ($ MXN)"
              type="number"
              placeholder="219.00"
              value={newSub.price}
              onChange={e => setNewSub({ ...newSub, price: e.target.value })}
            />
            <Input
              label="Día de Corte (1 - 31)"
              type="number"
              min={1}
              max={31}
              placeholder="15"
              value={newSub.cutoffDay}
              onChange={e => setNewSub({ ...newSub, cutoffDay: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm text-foreground/80">Fecha del Próximo Cobro</label>
            <input
              type="date"
              className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm"
              value={newSub.renewalDate}
              onChange={e => setNewSub({ ...newSub, renewalDate: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm text-foreground/80">Categoría del Gasto</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm"
              value={newSub.category}
              onChange={e => setNewSub({ ...newSub, category: e.target.value })}
            >
              <option>Hogar y Servicios</option>
              <option>Entretenimiento</option>
              <option>Telecomunicaciones</option>
              <option>Educación y Software</option>
              <option>Otros</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm text-foreground/80">Tarjeta para Cargo Automático</label>
            <select
              className="w-full px-4 py-2.5 rounded-xl bg-input-background border border-border text-sm"
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

          <Card className="p-3.5 flex items-center justify-between bg-emerald-500/5 border-emerald-500/20">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-semibold">Cobro Automático Activado</p>
                <p className="text-[11px] text-muted-foreground">El Cron Job ejecutará el pago en el día de corte</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={newSub.autoPay}
              onChange={e => setNewSub({ ...newSub, autoPay: e.target.checked })}
              className="w-4 h-4 accent-primary"
            />
          </Card>

          <Button className="w-full mt-4" onClick={handleAddSubscription}>
            <Check className="w-5 h-5" />
            Guardar y Programar Pago
          </Button>
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderHistory = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-xl font-bold">Historial de Pagos</h1>
            <p className="text-xs text-muted-foreground">Auditoría de cobros automáticos realizados</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSimulateCronJob}
            className="text-xs"
          >
            <Play className="w-3.5 h-3.5" /> Ejecutar Cron
          </Button>
        </div>

        <Card className="p-4 mb-5 bg-accent/40 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Transacciones procesadas</p>
            <p className="text-lg font-bold">{paymentHistory.length} pagos exitosos</p>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={() => window.print()}>
            <FileText className="w-4 h-4" /> Exportar PDF
          </Button>
        </Card>

        <div className="space-y-3">
          {paymentHistory.map(tx => (
            <Card key={tx.id} className="p-3.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-lg">
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{tx.serviceName}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-medium">
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{tx.method}</p>
                  <p className="text-[11px] text-muted-foreground/80">{tx.date} • Ref: {tx.reference}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-emerald-600">-${tx.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-muted-foreground">MXN</p>
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
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">Métodos de Pago</h1>
            <p className="text-xs text-muted-foreground">Tarjetas tokenizadas para cargos automáticos</p>
          </div>
          <Button size="sm" onClick={() => setShowAddCardModal(!showAddCardModal)}>
            <Plus className="w-4 h-4" /> Tarjeta
          </Button>
        </div>

        {showAddCardModal && (
          <Card className="p-4 mb-5 border-primary">
            <h3 className="text-sm font-bold mb-3">Vincular Nueva Tarjeta Bancaria</h3>
            <div className="space-y-3">
              <Input
                label="Banco Emisor"
                placeholder="Ej. BBVA, Banamex, Azteca, Nu"
                value={newCard.bank}
                onChange={e => setNewCard({ ...newCard, bank: e.target.value })}
              />
              <Input
                label="Número de Tarjeta (16 dígitos)"
                placeholder="4152 3134 0000 1234"
                maxLength={16}
                value={newCard.number}
                onChange={e => setNewCard({ ...newCard, number: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Vencimiento"
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
                  Tokenizar y Guardar
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4 mb-6">
          {cards.map(card => (
            <div
              key={card.id}
              className={`p-5 rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg relative overflow-hidden`}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-semibold tracking-wide">{card.bank}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 font-medium">
                  {card.brand}
                </span>
              </div>
              <p className="text-lg font-mono tracking-widest mb-4">
                •••• •••• •••• {card.last4}
              </p>
              <div className="flex justify-between items-end text-xs opacity-90">
                <div>
                  <p className="text-[10px] uppercase opacity-75">Titular</p>
                  <p className="font-medium">{card.holder}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase opacity-75">Expira</p>
                  <p className="font-medium">{card.expiry}</p>
                </div>
                {card.isDefault && (
                  <span className="bg-emerald-400/30 border border-emerald-300/40 px-2 py-0.5 rounded text-[10px]">
                    Principal
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold mb-1">Seguridad por Tokenización</h4>
              <p className="text-xs text-muted-foreground">
                Los datos sensibles no se almacenan en texto plano. Se procesan mediante tokens seguros vinculados a tu cuenta.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderCalendar = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Calendario de Corte</h1>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
            Volver
          </Button>
        </div>

        <Card className="p-4 mb-5">
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground py-1 font-medium">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const date = i + 1;
              const subOnDay = activeSubs.find(sub => sub.cutoffDay === date);

              return (
                <div
                  key={i}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-xs ${
                    subOnDay
                      ? 'bg-primary text-white font-bold shadow-sm'
                      : 'hover:bg-accent text-foreground'
                  }`}
                >
                  <span>{date}</span>
                  {subOnDay && <span className="text-[9px] leading-none">{subOnDay.icon}</span>}
                </div>
              );
            })}
          </div>
        </Card>

        <h3 className="text-sm font-bold mb-3">Próximos Cargos Automáticos</h3>
        <div className="space-y-2.5">
          {activeSubs.map(sub => (
            <Card key={sub.id} className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-xl">{sub.icon}</div>
                <div>
                  <h4 className="font-semibold text-sm">{sub.name}</h4>
                  <p className="text-xs text-muted-foreground">Tarjeta •••• {sub.cardLast4}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${sub.price.toFixed(2)}</p>
                <p className="text-xs text-primary font-medium">Día {sub.cutoffDay} de cada mes</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderAnalytics = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Proyección Financiera</h1>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
            Volver
          </Button>
        </div>

        <Card className="p-5 mb-5">
          <h3 className="text-sm font-bold mb-3">Distribución por Categoría</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                <span>{cat.name}</span>
                <span className="font-bold ml-auto">${cat.value.toFixed(2)} MXN</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 mb-5">
          <h3 className="text-sm font-bold mb-3">Historial de Gasto Mensual (MXN)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#5B67F1" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderNotifications = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Alertas Preventivas</h1>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
            Volver
          </Button>
        </div>

        <div className="space-y-3">
          {notifications.map(notif => (
            <Card key={notif.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  notif.type === 'reminder' ? 'bg-amber-500/15 text-amber-600' : 'bg-emerald-500/15 text-emerald-600'
                }`}>
                  {notif.type === 'reminder' ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-0.5">{notif.title}</h4>
                  <p className="text-xs text-muted-foreground">{notif.time}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  const renderProfile = () => (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-5 pb-28">
        <h1 className="text-xl font-bold mb-5">Perfil y Configuración</h1>

        <Card className="p-5 mb-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
              LT
            </div>
            <div>
              <h3 className="text-base font-bold">Luis Trejo</h3>
              <p className="text-xs text-muted-foreground">luis.trejo@ejemplo.mx</p>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-emerald-500/15 text-emerald-600 rounded-full font-medium">
                Cuenta Verificada
              </span>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <Card hover className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('analytics')}>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Gráficas y Proyección Financiera</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Card>

          <Card hover className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('calendar')}>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Calendario de Fechas de Corte</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Card>

          <Card hover className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setCurrentScreen('notifications')}>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Alertas Preventivas (24h antes)</span>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </Card>

          <Card className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setDarkMode(!darkMode)}>
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="text-sm font-medium">Modo Oscuro</span>
            </div>
            <div className={`w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-primary' : 'bg-border'} relative`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
          </Card>

          <Card hover className="p-4 flex items-center gap-3 text-destructive cursor-pointer" onClick={() => setCurrentScreen('login')}>
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Cerrar Sesión</span>
          </Card>
        </div>
      </div>

      <BottomNav currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
    </div>
  );

  return (
    <div className={`size-full flex items-center justify-center bg-background ${darkMode ? 'dark' : ''}`}>
      <div className="w-full max-w-md h-full bg-card shadow-2xl overflow-hidden relative">
        {currentScreen === 'splash' && renderSplash()}
        {currentScreen === 'onboarding' && renderOnboarding()}
        {currentScreen === 'login' && renderLogin()}
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
    { icon: User, label: 'Perfil', screen: 'profile' as Screen }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-2 py-2.5">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.screen || (item.screen === 'catalog' && currentScreen === 'add');
          return (
            <button
              key={item.screen}
              onClick={() => setCurrentScreen(item.screen)}
              className="flex flex-col items-center gap-1 transition-colors px-2"
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
              <span className={`text-[11px] ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
