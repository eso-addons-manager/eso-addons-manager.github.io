import {
  Download,
  RefreshCw,
  Link2,
  Search,
  Rocket,
  Library,
  Ban,
  Package,
  Star,
  Coins,
  FileText,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  download: Download,
  refresh: RefreshCw,
  link: Link2,
  search: Search,
  rocket: Rocket,
  library: Library,
  ban: Ban,
  package: Package,
  star: Star,
  coins: Coins,
  fileText: FileText,
};

type FeatureIconProps = {
  name: string;
  className?: string;
};

export default function FeatureIcon({ name, className = 'h-6 w-6' }: FeatureIconProps) {
  const Icon = iconMap[name] ?? Download;
  return <Icon className={className} aria-hidden="true" />;
}
