interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div
      className="bg-surface border border-aux rounded-lg shadow p-4 hover:shadow-md hover:scale-105
    transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-muted">{label}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  );
}
