import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spotitip",
	description: "Listen to Something Amazing. Only on Spotitip.",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<SupabaseProvider>
					<UserProvider>
						<ModalProvider />
						<Sidebar>
							{children}
						</Sidebar>
					</UserProvider>
				</SupabaseProvider>
			</body>
		</html>
	);
}
