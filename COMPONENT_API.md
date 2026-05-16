# Component API Reference

## Sidebar Component

### Location
`src/components/Sidebar.js`

### Props
```javascript
{
  isOpen: boolean,        // Controls sidebar visibility
  toggleSidebar: function // Toggle callback
}
```

### Features
- Responsive design (hidden on mobile, full width on desktop)
- Icons from lucide-react
- Active route highlighting
- Smooth animations
- Mobile overlay when open

### Menu Items
```javascript
Dashboard    → /dashboard
Vehicles     → /vehicles
Drivers      → /drivers
Maintenance  → /maintenance
Fuel Logs    → /fuel
Reports      → /reports
```

### Styling
- Background: `bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900`
- Text: White text with slate-400 accents
- Width: 256px (w-64)
- Responsive: `lg:relative lg:translate-x-0`

---

## TopNavbar Component

### Location
`src/components/TopNavbar.js`

### Props
```javascript
{
  user: {           // User object
    name: string,
    email: string
  },
  onLogout: function // Logout handler
}
```

### Features
- Sticky positioning
- Profile dropdown menu
- Notification bell with animation
- User avatar with initials
- Responsive design

### Styling
- Background: `bg-white/80 backdrop-blur-lg`
- Text: Gradient title from blue to pink
- Sticky: `sticky top-0 z-30`

---

## StatCard Component

### Location
`src/components/StatCard.js`

### Props
```javascript
{
  icon: Component,      // lucide-react icon component
  label: string,        // Card title/label
  value: string|number, // Main metric value
  subtitle: string,     // Optional subtitle
  bgGradient: string,   // Tailwind gradient class
  isHighlight: boolean  // Optional highlight flag
}
```

### Example Usage
```javascript
<StatCard
  icon={Truck}
  label="Total Vehicles"
  value={42}
  subtitle="Registered fleet units"
  bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
/>
```

### Styling
- Card: `rounded-2xl p-6 shadow-lg hover:shadow-2xl`
- Text: 4xl font-bold with gradient
- Icon: 14x14px with gradient background
- Hover: Lifts up with `-translate-y-1`

---

## ActivityTable Component

### Location
`src/components/ActivityTable.js`

### Props
```javascript
{
  data: Array<{
    id: number,
    vehicle: string,
    driver: string,
    tripType: string,
    distance: string,
    duration: string,
    fuel: string,
    status: string,
    statusColor: string
  }>
}
```

### Default Sample Data
4 sample trips with Completed, In Progress, and Scheduled statuses

### Columns (Responsive)
- Mobile: Vehicle, Status, Action
- Tablet (+768px): +Driver, +Distance
- Desktop (+1024px): +Trip Type

### Status Badges
```javascript
Completed  → bg-green-50 text-green-700
In Progress → bg-blue-50 text-blue-700
Scheduled   → bg-amber-50 text-amber-700
```

### Styling
- Card: `rounded-2xl shadow-lg border border-slate-100`
- Table: Hover effects on rows
- Footer: "View All Activities" link

---

## ChartPlaceholder Component

### Location
`src/components/ChartPlaceholder.js`

### Props
```javascript
{
  title: string,       // Chart title
  description: string  // Subtitle/description
}
```

### Features
- Large placeholder for future charts
- Icon visualization
- Ready for Chart.js integration
- Professional styling

### Styling
- Card: `rounded-2xl p-8 shadow-lg h-96`
- Icon: Large chart icon (w-32 h-32)
- Centered content

---

## Dashboard Page

### Location
`src/pages/Dashboard.js`

### Props
None (uses hooks and API calls)

### API Endpoint
```
GET /dashboard
```

### Response Example
```javascript
{
  totalVehicles: 45,
  totalDrivers: 28,
  totalTrips: 156,
  maintenanceCount: 7,
  totalExpenses: 15000,
  activeTrips: 12,
  completedTrips: 144
}
```

### Layout Structure
1. **Hero Section** - Title and description
2. **Stats Grid** - 4 stat cards in responsive grid
3. **Charts Section** - 2 placeholder charts
4. **Activity Table** - Recent activity

### Styling
- Background: `bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50`
- Container: `max-w-7xl mx-auto`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` (for cards)

---

## App Component Updates

### Location
`src/App.js`

### Key Changes
1. Added Sidebar and TopNavbar integration
2. Sidebar state management with `sidebarOpen`
3. Conditional rendering based on auth pages
4. Layout structure with sidebar integration

### New State
```javascript
const [sidebarOpen, setSidebarOpen] = useState(false);
```

---

## Tailwind CSS Configuration

### Location
`tailwind.config.js`

### Key Customizations
```javascript
{
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Aptos', 'Segoe UI Variable Text', 'sans-serif']
      },
      colors: {
        // Extended slate colors
      },
      boxShadow: {
        // Custom shadows
      }
    }
  }
}
```

---

## PostCSS Configuration

### Location
`postcss.config.js`

### Plugins
- tailwindcss
- autoprefixer

---

## Icon Classes (Lucide React)

### Available Icons
```javascript
LayoutDashboard  // Dashboard icon
Truck           // Vehicles icon
Users           // Drivers icon
Wrench          // Maintenance icon
Fuel            // Fuel logs icon
BarChart        // Reports/charts icon
Menu            // Mobile menu icon
X               // Close icon
Bell            // Notifications icon
LogOut          // Logout icon
User            // Profile icon
ChevronRight    // Action arrows
```

### Import Pattern
```javascript
import { Truck, Users, LayoutDashboard } from 'lucide-react';
```

---

## Global Styles (App.css)

### CSS Directives
- `@tailwind base;` - Tailwind base styles
- `@tailwind components;` - Component classes
- `@tailwind utilities;` - Utility classes

### Custom Styles
- Root CSS variables (legacy support)
- Scrollbar styling
- Body background gradient
- Smooth transitions

---

## Responsive Grid Breakpoints

### Card Grid
```
Mobile (default): 1 column
Tablet (md):      2 columns
Desktop (lg):     4 columns
```

### Table Columns
```
Mobile:   Vehicle, Status, Action
Tablet:   +Driver, +Distance
Desktop:  +Trip Type
```

---

## Color Palette

### Gradients Used
- Blue: `from-blue-500 to-blue-600`
- Purple: `from-purple-500 to-purple-600`
- Orange: `from-orange-500 to-orange-600`
- Pink/Red: `from-pink-500 to-red-600`

### Text Colors
- Primary: `text-slate-900`
- Secondary: `text-slate-700`
- Tertiary: `text-slate-600`
- Muted: `text-slate-500`

### Background Colors
- White: `white` or `bg-white`
- Light: `bg-slate-50` or `bg-slate-100`
- Muted: `bg-slate-100` or `bg-slate-200`

---

## Performance Considerations

### Bundle Size
- Tailwind CSS: ~50KB (gzipped)
- Lucide React: ~15KB per icon
- React + Router: ~100KB (gzipped)

### Optimization
- CSS Purging: Unused styles removed in production
- Code Splitting: Components ready for lazy loading
- Tree Shaking: Only imported lucide icons included

---

## Browser Compatibility

| Browser | Support | Version |
|---------|---------|---------|
| Chrome  | ✅ Full | Latest  |
| Firefox | ✅ Full | Latest  |
| Safari  | ✅ Full | Latest  |
| Edge    | ✅ Full | Latest  |
| Mobile  | ✅ Full | Latest  |

---

## Common Usage Examples

### Using StatCard
```javascript
<StatCard
  icon={Truck}
  label="Active Vehicles"
  value={24}
  subtitle="On the road"
  bgGradient="bg-gradient-to-br from-blue-500 to-blue-600"
/>
```

### Modifying Sidebar
```javascript
// In Sidebar.js menuItems array
{ to: '/new-page', label: 'New Item', icon: NewIcon }
```

### Adding New Dashboard Stats
```javascript
// In Dashboard.js, add to stats grid
<StatCard
  icon={NewIcon}
  label="New Metric"
  value={stats.newValue}
  subtitle="Description"
  bgGradient="bg-gradient-to-br from-purple-500 to-pink-600"
/>
```

---

## Notes

- All components use Tailwind CSS utility classes (NO inline styles)
- Icons from lucide-react for consistency
- Responsive design follows mobile-first approach
- Dark sidebar with light content areas for contrast
- Smooth animations and transitions throughout
