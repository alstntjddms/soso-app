"use client";
import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";

export default function Menu() {
  return (
    <Accordion isCompact>
      <AccordionItem key="1" aria-label="메뉴1" title="메뉴1">
        <Link href="/pages/dashboard">dashboard</Link><br />
        <Link href="/pages/indivisual">indivisual</Link>
      </AccordionItem>
      <AccordionItem key="2" aria-label="메뉴2" title="메뉴2">
        <Link href="/pages/indivisual">indivisual</Link>
      </AccordionItem>
      <AccordionItem key="3" aria-label="메뉴3" title="메뉴3">
        <Link href="/pages/teamleader">teamleader</Link>
      </AccordionItem>
    </Accordion>
  );
}
