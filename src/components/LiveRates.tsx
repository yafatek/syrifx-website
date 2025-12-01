import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  MapPin,
  Loader2,
  AlertCircle,
  ArrowLeftRight,
  Coins,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// =============================================================================
// Types
// =============================================================================

interface CurrencyRate {
  code: string
  name: string
  buy: string
  sell: string
  change: string
  change_percent: string
  direction: number
}

interface CityRates {
  city: string
  city_ar: string
  currencies: CurrencyRate[]
}

interface GoldPrices {
  gold_21k: string
  gold_18k: string
  gold_24k: string
}

interface ApiResponse {
  success: boolean
  data: {
    cities: Record<string, CityRates>
    gold: GoldPrices
  }
  fetched_at: string
}

// =============================================================================
// Constants
// =============================================================================

const API_BASE = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD 
    ? 'https://api.syrifx.com' 
    : 'https://api-stg.syrifx.com'
)

const CITIES = [
  { slug: 'damascus', ar: 'دمشق', emoji: '🏛️' },
  { slug: 'aleppo', ar: 'حلب', emoji: '🏰' },
  { slug: 'idlib', ar: 'إدلب', emoji: '🌳' },
  { slug: 'alhasakah', ar: 'الحسكة', emoji: '🌾' },
]

const CURRENCY_FLAGS: Record<string, string> = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  TRY: '🇹🇷',
  AED: '🇦🇪',
  SAR: '🇸🇦',
  GBP: '🇬🇧',
  JOD: '🇯🇴',
  EGP: '🇪🇬',
  KWD: '🇰🇼',
  QAR: '🇶🇦',
  LBP: '🇱🇧',
  IQD: '🇮🇶',
  BHD: '🇧🇭',
  OMR: '🇴🇲',
  CNY: '🇨🇳',
  RUB: '🇷🇺',
  CHF: '🇨🇭',
}

// =============================================================================
// Utility Functions
// =============================================================================

function formatNumber(value: string): string {
  const num = parseFloat(value)
  if (isNaN(num)) return value
  return num.toLocaleString('ar-SY', { maximumFractionDigits: 0 })
}

function getFlag(code: string): string {
  return CURRENCY_FLAGS[code] || '💱'
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  
  if (diffMins < 1) return 'الآن'
  if (diffMins < 60) return `منذ ${diffMins} دقيقة`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `منذ ${diffHours} ساعة`
  return `منذ ${Math.floor(diffHours / 24)} يوم`
}

// =============================================================================
// Components
// =============================================================================

function CurrencyRow({ currency, onClick }: { currency: CurrencyRate; onClick: () => void }) {
  const isUp = currency.direction === 1
  const isDown = currency.direction === 0 && parseFloat(currency.change) < 0
  
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors group"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{getFlag(currency.code)}</span>
        <div className="text-right">
          <div className="font-bold text-white">{currency.name}</div>
          <div className="text-xs text-zinc-500">{currency.code}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-left">
          <div className="font-mono font-bold text-white text-lg" dir="ltr">
            {formatNumber(currency.buy)}
          </div>
          <div className="text-xs text-zinc-500">شراء</div>
        </div>
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
          isUp && "bg-emerald-500/10 text-emerald-400",
          isDown && "bg-red-500/10 text-red-400",
          !isUp && !isDown && "bg-zinc-700/50 text-zinc-400"
        )}>
          {isUp && <TrendingUp className="w-3 h-3" />}
          {isDown && <TrendingDown className="w-3 h-3" />}
          <span dir="ltr">{currency.change_percent}%</span>
        </div>
      </div>
    </motion.button>
  )
}

function CurrencyDetail({ 
  currency, 
  onBack,
  onConvert 
}: { 
  currency: CurrencyRate
  onBack: () => void
  onConvert: (amount: number) => void
}) {
  const [amount, setAmount] = useState('')
  const isUp = currency.direction === 1
  const isDown = currency.direction === 0 && parseFloat(currency.change) < 0

  const handleConvert = () => {
    const num = parseFloat(amount)
    if (!isNaN(num) && num > 0) {
      onConvert(num)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
      >
        <span>← رجوع</span>
      </button>

      <div className="bg-zinc-800/50 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{getFlag(currency.code)}</span>
          <div>
            <h3 className="text-2xl font-bold text-white">{currency.name}</h3>
            <p className="text-zinc-500">{currency.code}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-900/50 rounded-xl p-4">
            <div className="text-sm text-zinc-500 mb-1">سعر الشراء</div>
            <div className="text-2xl font-bold font-mono text-white" dir="ltr">
              {formatNumber(currency.buy)}
            </div>
            <div className="text-xs text-zinc-500">ل.س</div>
          </div>
          <div className="bg-zinc-900/50 rounded-xl p-4">
            <div className="text-sm text-zinc-500 mb-1">سعر البيع</div>
            <div className="text-2xl font-bold font-mono text-white" dir="ltr">
              {formatNumber(currency.sell)}
            </div>
            <div className="text-xs text-zinc-500">ل.س</div>
          </div>
        </div>

        <div className={cn(
          "flex items-center justify-center gap-2 p-3 rounded-xl",
          isUp && "bg-emerald-500/10 text-emerald-400",
          isDown && "bg-red-500/10 text-red-400",
          !isUp && !isDown && "bg-zinc-700/50 text-zinc-400"
        )}>
          {isUp && <TrendingUp className="w-5 h-5" />}
          {isDown && <TrendingDown className="w-5 h-5" />}
          <span className="font-bold">
            التغيير: {currency.change} ({currency.change_percent}%)
          </span>
        </div>
      </div>

      <div className="bg-zinc-800/50 rounded-2xl p-6">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-accent" />
          تحويل سريع
        </h4>
        <div className="flex gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={`أدخل المبلغ بـ ${currency.code}`}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-accent"
            dir="ltr"
          />
          <button
            onClick={handleConvert}
            className="px-6 py-3 bg-accent hover:bg-accent/90 text-black font-bold rounded-xl transition-colors"
          >
            حوّل
          </button>
        </div>
        {amount && !isNaN(parseFloat(amount)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-zinc-900/50 rounded-xl text-center"
          >
            <div className="text-sm text-zinc-500 mb-1">
              {amount} {currency.code} =
            </div>
            <div className="text-3xl font-bold font-mono text-accent" dir="ltr">
              {formatNumber((parseFloat(amount) * parseFloat(currency.buy)).toString())}
            </div>
            <div className="text-sm text-zinc-500">ليرة سورية</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function GoldCard({ gold }: { gold: GoldPrices }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-6"
    >
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">🥇</span>
        أسعار الذهب
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'عيار 24', value: gold.gold_24k },
          { label: 'عيار 21', value: gold.gold_21k },
          { label: 'عيار 18', value: gold.gold_18k },
        ].map((item) => (
          <div key={item.label} className="bg-zinc-900/50 rounded-xl p-3 text-center">
            <div className="text-xs text-zinc-500 mb-1">{item.label}</div>
            <div className="font-mono font-bold text-yellow-400" dir="ltr">
              {formatNumber(item.value)}
            </div>
            <div className="text-[10px] text-zinc-500">ل.س/غرام</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export default function LiveRates() {
  const [data, setData] = useState<ApiResponse['data'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState('damascus')
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRate | null>(null)
  const [fetchedAt, setFetchedAt] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchRates = useCallback(async (showRefreshing = false) => {
    if (showRefreshing) setRefreshing(true)
    else setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE}/rates`)
      if (!response.ok) throw new Error('Failed to fetch rates')
      
      const json: ApiResponse = await response.json()
      if (!json.success) throw new Error('API returned error')
      
      setData(json.data)
      setFetchedAt(json.fetched_at)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
    // Refresh every 2 minutes
    const interval = setInterval(() => fetchRates(true), 120000)
    return () => clearInterval(interval)
  }, [fetchRates])

  const currentCityData = data?.cities[selectedCity]

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-accent animate-spin mb-4" />
        <p className="text-zinc-400">جاري تحميل الأسعار...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <AlertCircle className="w-10 h-10 text-red-400 mb-4" />
        <p className="text-zinc-400 mb-4">{error}</p>
        <button
          onClick={() => fetchRates()}
          className="px-6 py-2 bg-accent hover:bg-accent/90 text-black font-bold rounded-xl"
        >
          حاول مجدداً
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-accent" />
            أسعار الصرف الحية
          </h2>
          {fetchedAt && (
            <p className="text-sm text-zinc-500 mt-1">
              آخر تحديث: {timeAgo(fetchedAt)}
            </p>
          )}
        </div>
        <button
          onClick={() => fetchRates(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw className={cn("w-4 h-4", refreshing && "animate-spin")} />
          تحديث
        </button>
      </div>

      {/* City Selector */}
      <div className="flex flex-wrap gap-2">
        {CITIES.map((city) => (
          <button
            key={city.slug}
            onClick={() => {
              setSelectedCity(city.slug)
              setSelectedCurrency(null)
            }}
            className={cn(
              "px-4 py-2 rounded-xl font-bold transition-all flex items-center gap-2",
              selectedCity === city.slug
                ? "bg-accent text-black"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
            )}
          >
            <span>{city.emoji}</span>
            {city.ar}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {selectedCurrency ? (
          <CurrencyDetail
            key="detail"
            currency={selectedCurrency}
            onBack={() => setSelectedCurrency(null)}
            onConvert={(amount) => {
              // Could open Telegram bot with convert command
              window.open(`https://t.me/SyriFXBot?start=convert_${selectedCurrency.code}_${amount}`, '_blank')
            }}
          />
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* City Header */}
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="w-4 h-4" />
              <span>أسعار {currentCityData?.city_ar}</span>
            </div>

            {/* Currency List */}
            <div className="space-y-2">
              {currentCityData?.currencies.map((currency) => (
                <CurrencyRow
                  key={currency.code}
                  currency={currency}
                  onClick={() => setSelectedCurrency(currency)}
                />
              ))}
            </div>

            {/* Gold Prices */}
            {data?.gold && <GoldCard gold={data.gold} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

