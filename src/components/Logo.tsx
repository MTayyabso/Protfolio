import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

const Logo = ({ className = '', variant = 'full' }: LogoProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center ${className}`}
    >
      <svg
        width={variant === 'full' ? '180' : '50'}
        height="50"
        viewBox={variant === 'full' ? '0 0 180 50' : '0 0 50 50'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FF8F00', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#FFB74D', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#00BCD4', stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#00BCD4', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4DD0E1', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Icon Part - Hexagon with MTS */}
        <g>
          {/* Hexagon background */}
          <path
            d="M25 5 L40 13.66 L40 30.34 L25 39 L10 30.34 L10 13.66 Z"
            fill="url(#logoGradient)"
            opacity="0.2"
          />
          
          {/* Hexagon border */}
          <path
            d="M25 5 L40 13.66 L40 30.34 L25 39 L10 30.34 L10 13.66 Z"
            stroke="url(#logoGradient)"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Inner accent lines */}
          <path
            d="M25 12 L25 32"
            stroke="url(#accentGradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18 18 L32 26"
            stroke="url(#accentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M18 26 L32 18"
            stroke="url(#accentGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          
          {/* Code brackets decoration */}
          <text
            x="25"
            y="28"
            fill="url(#logoGradient)"
            fontSize="18"
            fontWeight="bold"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
          >
            {'</>'}
          </text>
        </g>

        {/* Text Part (only shown in 'full' variant) */}
        {variant === 'full' && (
          <g>
            {/* Main text - MS */}
            <text
              x="55"
              y="28"
              fill="url(#logoGradient)"
              fontSize="24"
              fontWeight="800"
              fontFamily="'Inter', sans-serif"
              letterSpacing="1"
            >
              MS
            </text>
            
            {/* Subtitle */}
            <text
              x="55"
              y="40"
              fill="#9CA3AF"
              fontSize="9"
              fontWeight="500"
              fontFamily="'Inter', sans-serif"
              letterSpacing="2"
            >
              DEVELOPER
            </text>
            
            {/* Decorative dot */}
            <circle cx="170" cy="25" r="3" fill="url(#accentGradient)" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};

export default Logo;
