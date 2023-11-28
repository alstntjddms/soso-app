"use client";
import React from "react";
import { Button, Accordion, AccordionItem } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import Link from "next/link";
export default function Menu() {
  const dispatch = useDispatch();

  return (
    <Accordion
      isCompact
      selectionMode="multiple"
      // defaultExpandedKeys={["1", "2", "3"]}
    >
      <AccordionItem key="1" aria-label="메뉴1" title="메뉴1">
        <Link href="/pages/dashboard" className="text-blue-500 hover:underline">
          dashboard
        </Link>
      </AccordionItem>
      <AccordionItem key="2" aria-label="메뉴2" title="메뉴2">
        <Link
          href="/pages/indivisual"
          className="text-blue-500 hover:underline"
        >
          indivisual
        </Link>
      </AccordionItem>
      <AccordionItem key="3" aria-label="메뉴3" title="메뉴3">
        <Link
          href="/pages/teamleader"
          className="text-blue-500 hover:underline"
        >
          teamleader
        </Link>
      </AccordionItem>
    </Accordion>
  );
}
