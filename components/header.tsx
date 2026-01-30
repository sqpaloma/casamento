"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
    const [openMenu, setOpenMenu] = useState<string | null>(null);
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
        <div
            className="group fixed start-0 end-0 top-0 z-10 flex justify-center md:top-4"
            data-at-top="true"
        >
            <div className="md:bg-background bg-background/90 flex h-16 items-center gap-20 px-4 backdrop-blur-sm transition-all duration-500 group-data-[at-top=false]:shadow group-data-[at-top=true]:bg-transparent hover:group-data-[at-top=false]:shadow-lg max-md:grow max-md:justify-between md:rounded-full md:px-8">
                <div className="flex items-center gap-56 justify-between">

                    <Link href="/">
                        <Image src="/letras.webp"
                            alt="Rodrigo & Paloma"
                            width={100}
                            height={40}
                            className="h-15 w-auto" />
                    </Link>
                    <nav>
                        <ul className="flex gap-6">
                            {menuItems.map((item) => (
                                <li key={item.href} className="relative">
                                    {item.items ? (
                                        <div>
                                            <button
                                                onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                                                className="hover:text-blue-400  text-gray-600 flex items-center gap-1"
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
                                        <Link href={item.href} className="hover:text-blue-400  text-gray-600 flex items-center gap-1">
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}