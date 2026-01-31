"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuItems = [
        {
            label: "Paginas",
            href: "/",
            items: [
                {
                    label: "Home",
                    href: "/",
                    items: [
                        {
                            label: "Nossa História",
                            href: "/historia",
                        },
                        {
                            label: "Padrinhos",
                            href: "/padrinhos",
                        },
                        {
                            label: "Chá de Lingerie & Bar",
                            href: "/cha-lingerie-bar",
                        },
                        {
                            label: "Ceremonia e Recepção",
                            href: "/cerimonia-recepcao",
                        },
                        {
                            label: "Mensagens",
                            href: "/mensagens",
                        },
                        {
                            label: "Dicas",
                            href: "/dicas",
                        },

                    ],
                },
            ]
        },
        {
            label: "Presentes",
            href: "/presentes",
        },
        {
            label: "Confirmar Presença",
            href: "/confirmar-presenca",
        },
    ];

    return (
        <>
            <div
                className="group fixed start-0 end-0 top-0 z-50 flex justify-center md:top-4"
                data-at-top="true"
            >
                {/* Desktop/Tablet Header */}
                <div className="bg-transparent flex h-16 items-center px-4 transition-all duration-500 group-data-[at-top=false]:shadow group-data-[at-top=true]:bg-transparent hover:group-data-[at-top=false]:shadow-lg w-full justify-between md:w-auto md:rounded-full md:px-8 md:backdrop-blur-sm md:bg-background/90 md:gap-56 md:mx-4">

                    {/* Logo */}
                    <Link href="/">
                        <Image
                            src="/letras.webp"
                            alt="Rodrigo & Paloma"
                            width={100}
                            height={40}
                            className="h-15 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:block">
                        <ul className="flex gap-6">
                            {menuItems.map((item) => (
                                <li key={item.href} className="relative">
                                    {item.items ? (
                                        <div>
                                            <button
                                                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                                                className="hover:text-blue-400 text-gray-600 flex items-center gap-1"
                                            >
                                                {item.label}
                                                <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                                            </button>
                                            {openMenu === item.label && (
                                                <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px]">
                                                    {item.items.map((subItem) => (
                                                        <div key={subItem.href}>
                                                            <Link
                                                                href={subItem.href}
                                                                className="block px-4 py-2 hover:bg-gray-100 text-gray-500"
                                                                onClick={() => setOpenMenu(null)}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                            {subItem.items && subItem.items.map((nestedItem) => (
                                                                <Link
                                                                    key={nestedItem.href}
                                                                    href={nestedItem.href}
                                                                    className="block px-6 py-2 hover:bg-gray-100 text-gray-500 text-sm"
                                                                    onClick={() => setOpenMenu(null)}
                                                                >
                                                                    {nestedItem.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link href={item.href} className="hover:text-blue-400 text-gray-600 flex items-center gap-1">
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-gray-600 hover:text-blue-400"
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-60 ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}
            >
                {/* Close Button */}
                <div className="flex justify-end p-4">
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-gray-600 hover:text-blue-400"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="px-4">
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item) => (
                            <li key={item.href}>
                                {item.items ? (
                                    <div>
                                        <button
                                            onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                                            className="w-full text-left py-3 px-4 hover:bg-gray-100 rounded-lg text-gray-600 flex items-center justify-between"
                                        >
                                            {item.label}
                                            <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openMenu === item.label && (
                                            <div className="ml-4 mt-1">
                                                {item.items.map((subItem) => (
                                                    <div key={subItem.href}>
                                                        <Link
                                                            href={subItem.href}
                                                            className="block py-2 px-4 hover:bg-gray-100 rounded-lg text-gray-500"
                                                            onClick={() => {
                                                                setOpenMenu(null);
                                                                setMobileMenuOpen(false);
                                                            }}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                        {subItem.items && subItem.items.map((nestedItem) => (
                                                            <Link
                                                                key={nestedItem.href}
                                                                href={nestedItem.href}
                                                                className="block py-2 pl-8 pr-4 hover:bg-gray-100 rounded-lg text-gray-500 text-sm"
                                                                onClick={() => {
                                                                    setOpenMenu(null);
                                                                    setMobileMenuOpen(false);
                                                                }}
                                                            >
                                                                {nestedItem.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="block py-3 px-4 hover:bg-gray-100 rounded-lg text-gray-600"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}