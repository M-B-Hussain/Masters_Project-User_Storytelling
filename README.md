# Deutsche Bahn Dashboard - Media Project

A comprehensive interactive dashboard and quiz system for Deutsche Bahn performance analytics, built as part of a media project focusing on usability evaluation of interactivity and storytelling in data stories.

## Features

### 🎯 Interactive Quiz System
- **3 Interactive Questions** based on Deutsche Bahn data
- **Real-time Feedback** with correct/incorrect answers
- **Visual Data Storytelling** with charts and images
- **Progressive Disclosure** of information

### 📊 Comprehensive Dashboard
- **Real-time Metrics**: Punctuality, delays, compensation, infrastructure
- **Visual Charts**: Trends, distributions, and analysis
- **Responsive Design**: Works on all devices
- **Dark/Light Mode**: Toggle between themes

### 🎨 Design System
- **Figma-based Design**: Faithful implementation of provided designs
- **Deutsche Bahn Branding**: Official colors and typography
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant components

## Quiz Questions

1. **Compensation Question**: How much did DB pay in compensation for delays in 2024?
   - Answer: €197 million (50% increase from previous year)

2. **Delay Causes**: What's the most common cause of train delays?
   - Answer: Infrastructure bottlenecks (80% of delays)

3. **Average Delay**: What's the average delay time per train?
   - Answer: 10.3 minutes (officially failing the network)

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Theme**: Custom dark/light mode system
- **Images**: Optimized Figma assets
- **Fonts**: Inter & Roboto

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
figma-media/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.tsx        # Home page with quiz
│   │   ├── service/        # Dashboard page
│   │   ├── contact/        # Contact page
│   │   └── dashboard/      # Dedicated dashboard
│   ├── components/         # Reusable components
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── Navigation.tsx
│   │   ├── QuizScreen.tsx
│   │   └── Dashboard.tsx
│   └── globals.css         # Global styles
├── public/
│   └── images/            # Figma assets
└── package.json
```

## Key Components

### Theme System
- Context-based theme management
- Local storage persistence
- Smooth transitions between modes

### Navigation
- Active state indicators
- Responsive design
- Smooth hover effects

### Quiz System
- State management for progress
- Visual feedback for answers
- Progressive information disclosure

### Dashboard
- Metric cards with trend indicators
- Chart integration
- Responsive grid layout

## Research Context

This project is part of a media research study evaluating:
- **Interactivity** in data storytelling
- **User engagement** with quiz-based learning
- **Visual design** impact on comprehension
- **Dashboard usability** for complex metrics

## Data Sources

All data presented is based on Deutsche Bahn's official reports and public statistics:
- 2024 compensation figures
- Infrastructure delay analysis
- Punctuality metrics
- Network performance data

## Future Enhancements

- [ ] Real-time data integration
- [ ] Advanced chart interactions
- [ ] User progress tracking
- [ ] Accessibility improvements
- [ ] Mobile app version

## License

This project is created for educational and research purposes as part of a media project study.
