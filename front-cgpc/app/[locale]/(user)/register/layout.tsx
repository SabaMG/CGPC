// layout.tsx
export default function registerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="min-h-screen w-full">{children}</div>;
}
