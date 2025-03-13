// layout.tsx
export default function ProductLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="min-h-screen w-full">{children}</div>;
}
