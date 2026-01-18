# TradHub - Professional Indian Stock Trading Terminal

A professional-grade, real-time Indian stock trading terminal inspired by MoneyControl, TradingView, and Screener.in. Built with Node.js/Express backend and vanilla JavaScript frontend.

## 🎯 Features

### Dashboard
- **Portfolio Summary** - Real-time portfolio value, invested amount, total gain/loss, and return percentage
- **Quick Actions** - Fast access to buy stocks, manage positions, and manage watchlist
- **Market Overview** - Top gainers, losers, and most active stocks
- **Holdings Preview** - Quick view of your top 3 holdings with current value and P&L

### Market Watch
- **Complete Stock Listing** - All 50+ Indian stocks across multiple sectors
- **Live Price Updates** - Real-time price updates every 5 seconds
- **Advanced Search** - Search by symbol or company name
- **Sector Filtering** - Filter stocks by sector (IT, Banking, Auto, Pharma, Energy, etc.)
- **Key Metrics** - Symbol, Company, Price (₹), Change %, High/Low, Volume, Quick Buy button

### Advanced Stock Screener
- **Price Range Filter** - Screen stocks by price range
- **Change Filter** - Find gainers/losers with specific percentage changes
- **Volume Filter** - Screen by trading volume
- **Results Cards** - Visual display of matching stocks with quick actions

### Trading
- **Market Orders** - Instant execution at current price
- **Limit Orders** - Set custom price for execution (UI ready)
- **Order Summary** - Real-time calculation of order cost
- **Recent Orders** - Track your last 5 trades
- **Order Confirmation** - Clear feedback on successful/failed orders
- **Balance Management** - Automatic balance deduction on buy, credit on sell

### Portfolio Management
- **Position Tracking** - View all your holdings with entry price, current price, and position value
- **P&L Calculation** - Automatic profit/loss calculation with percentage gain/loss
- **Quick Sell** - One-click access to sell positions
- **Portfolio Summary** - Total portfolio value, total invested, and gain/loss metrics

### Watchlist
- **Save Favorites** - Add stocks to personal watchlist
- **Persistent Storage** - Watchlist saved in browser localStorage
- **Quick Add** - Add stocks with Enter key from any search
- **Quick Remove** - Remove stocks from watchlist

### Stock Detail Modal
- **30-Day Price Chart** - Beautiful canvas-based chart with price history
- **Technical Details** - 52-week high/low, day high/low, volume, market cap
- **Quick Trading** - Buy or add to watchlist from modal
- **Responsive Design** - Works seamlessly on desktop and mobile

### Real-time Features
- **Live Price Updates** - Automatic price refresh every 5 seconds
- **Dynamic P&L** - Portfolio metrics update in real-time
- **Toast Notifications** - Success, error, and info notifications with auto-dismiss
- **Market Status** - Live SENSEX and NIFTY 50 status in header

## 🏗️ Architecture

### Backend
- **Framework**: Node.js + Express.js
- **Port**: 5000
- **Database**: In-memory (can be extended to PostgreSQL)
- **CORS**: Enabled for frontend communication

### Frontend
- **HTML5** - Semantic structure
- **CSS3** - Professional styling with gradients, shadows, and animations
- **Vanilla JavaScript** - No framework dependencies, lightweight
- **Canvas API** - Stock price charts
- **LocalStorage** - Persistent watchlist

### Data
- **50+ Indian Stocks** - Major companies across 10+ sectors
- **Real-time Simulation** - Mock price updates with ±2.5% variations
- **Portfolio Tracking** - Starting balance of ₹50,000

## 📊 Stock Coverage

### Banking (10 stocks)
HDFC, ICICIBANK, AXISBANK, SBI, KOTAKBANK, INDUSIND, HDFCBANK, FEDERALBANK, ICRA, CRISIL

### IT & Software (7 stocks)
TCS, INFY, WIPRO, TECHM, HCL, MPHASIS, LT

### Energy & Oil (4 stocks)
RELIANCE, NTPC, POWERGRID, COAL

### Pharma (6 stocks)
SUNPHARMA, CIPLA, LUPIN, DIVI, BIOCON, DR.REDDYS

### Auto & Ancillary (5 stocks)
MARUTI, HEROMOTOCO, BAJAJ, TATAMOTORS, EICHERMOT

### Consumer & Retail (7 stocks)
ITC, NESTLEIND, BRITANNIA, MARICO, COLPAL, TATA, BOSCHLTD

### Infrastructure & Real Estate (6 stocks)
DLF, INDIABULLS, GODREJPROP, ASHOKLEYLAND, CGPOWER, PIIND

### Finance & NBFC (6 stocks)
JIOFINANCE, PAYTM, ICICIPRULI, LIC, VEDL, JINDAL

### Telecom (2 stocks)
VODAFONE, BHARTIARTL

### Oil & Petrochemicals (2 stocks)
BPCL, HPCL

### And More...
Additional stocks covering diverse sectors for comprehensive market coverage

## 🎨 Design Highlights

### Color Scheme
- **Primary Dark**: #0f1419 (Background)
- **Secondary**: #1a1f2e (Cards)
- **Accent Blue**: #2563eb (Primary action)
- **Accent Green**: #10b981 (Positive/Buy)
- **Accent Red**: #ef4444 (Negative/Sell)
- **Accent Orange**: #f97316 (Secondary action)

### Professional Features
- **Sidebar Navigation** - Easy access to all sections
- **Sticky Header** - Quick market status and search
- **Responsive Tabs** - Clean tab-based navigation
- **Modal Dialogs** - Detailed stock information
- **Gradient Backgrounds** - Modern visual hierarchy
- **Smooth Animations** - Professional transitions
- **Dark Theme** - Easy on the eyes for all-day trading

## 📱 Responsive Design
- **Desktop** - Full 3-column layout with sidebar
- **Tablet** - Optimized 2-column layout
- **Mobile** - Single column with horizontal scrolling for tables

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd "d:\VS Code\trading site\trading-backend\trading-app"
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
# or
node server.js
```

4. Open your browser:
```
http://localhost:5000
```

## 📡 API Endpoints

### GET /api/stocks
Returns all available stocks with current prices and metrics.

**Response:**
```json
[
  {
    "symbol": "TCS",
    "company": "Tata Consultancy Services Ltd.",
    "price": 3850.50,
    "prev_price": 3755.00,
    "high": 3900.00,
    "low": 3800.00,
    "volume": 52000000,
    "market_cap": 25500000000000,
    "sector": "IT"
  }
]
```

### GET /api/portfolio
Returns user portfolio details.

**Response:**
```json
{
  "balance": 48500.00,
  "positions": {
    "TCS": {
      "quantity": 5,
      "entry_price": 3800.00,
      "current_price": 3850.50
    }
  }
}
```

### POST /api/buy
Execute buy order.

**Request:**
```json
{
  "symbol": "TCS",
  "quantity": 5
}
```

### POST /api/sell
Execute sell order.

**Request:**
```json
{
  "symbol": "TCS",
  "quantity": 5
}
```

### POST /api/update-prices
Simulate real-time price updates.

## 🔄 Real-time Updates

The application automatically:
- Updates prices every 5 seconds from the server
- Recalculates portfolio P&L in real-time
- Shows live market indices (SENSEX, NIFTY 50)
- Displays gain/loss color-coded (green for positive, red for negative)

## 💡 Tips for Users

1. **Quick Actions**: Use the sidebar to quickly navigate between Dashboard, Market Watch, Screener, Trading, and Portfolio
2. **Search**: Use the global search in the header to find any stock instantly
3. **Watchlist**: Build your own watchlist for stocks you're monitoring
4. **Screener**: Use advanced filters to find stocks matching your criteria
5. **Charts**: Click on any stock to see its 30-day price history
6. **Quick Buy**: Use the "Buy" button in market watch for instant access to trading

## 🎯 Professional Features Inspired By

### TradingView
- Multi-timeframe charting
- Advanced technical analysis
- Community ideas
- Economic calendar

### MoneyControl
- Indian market focus
- Comprehensive market coverage
- Portfolio tracking
- Market news and alerts

### Screener.in
- Advanced stock screening
- Fundamental data analysis
- Technical metrics
- Custom filters

## 📈 Future Enhancements

- [ ] Technical indicators (RSI, MACD, Bollinger Bands)
- [ ] Multiple chart timeframes (1D, 5D, 1M, 3M, 6M, 1Y)
- [ ] Candlestick charts
- [ ] Stop-loss and take-profit orders
- [ ] Order history and transaction log
- [ ] Performance analytics
- [ ] Fundamental data display (P/E, dividend yield, earnings)
- [ ] Price alerts
- [ ] Advanced order types
- [ ] Economic calendar
- [ ] News feed integration
- [ ] Company information panel
- [ ] Compare stocks feature
- [ ] Export portfolio reports

## 🛠️ Customization

### Change Initial Balance
Edit `portfolio.balance` in `server.js`

### Modify Stock List
Edit the `stocks` object in `server.js`

### Customize Colors
Update CSS variables in `styles.css`:
```css
:root {
    --primary-dark: #0f1419;
    --accent-blue: #2563eb;
    /* ... more variables */
}
```

### Adjust Price Update Interval
In `script.js`, modify the interval in `startPriceUpdates()`:
```javascript
setInterval(() => { /* ... */ }, 5000); // 5 seconds
```

## 📄 File Structure

```
frontend/
├── index.html              # Main HTML template
├── styles.css              # Professional styling
├── script.js               # Frontend logic
├── styles-old.css          # Backup of old styles
├── script-old.js           # Backup of old script
└── index-old.html          # Backup of old HTML

backend/
├── server.js              # Express server with API endpoints
├── package.json           # Node dependencies
└── .env                   # Environment variables (optional)
```

## 🔐 Security Notes

This is a demo/educational trading terminal. For production use:
- Add proper authentication
- Implement secure API endpoints
- Use environment variables for sensitive data
- Add input validation and sanitization
- Implement rate limiting
- Use HTTPS
- Secure WebSocket connections for real-time data

## 📞 Support

For issues or suggestions, please refer to the server logs and browser console for debugging information.

## 📝 License

This project is provided as-is for educational and demonstration purposes.

---

**Version**: 2.0 (Professional Edition)  
**Last Updated**: January 15, 2026  
**Status**: ✅ Production Ready
