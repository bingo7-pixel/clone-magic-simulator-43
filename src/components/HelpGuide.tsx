import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpGuide = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Help & Training Guide</h2>
      
      <Accordion type="single" collapsible>
        <AccordionItem value="orders">
          <AccordionTrigger>Managing Orders</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>View all orders in the main dashboard</li>
              <li>Click on any order to see detailed information</li>
              <li>Use filters to sort by date, waiter, or status</li>
              <li>Update order status as needed</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="analytics">
          <AccordionTrigger>Using Analytics</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>View key metrics in the Analytics tab</li>
              <li>Monitor order status distribution</li>
              <li>Track order volumes throughout the day</li>
              <li>Identify peak hours and potential issues</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="roles">
          <AccordionTrigger>User Roles & Permissions</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Staff: View orders and basic analytics</li>
              <li>Managers: Update orders and view detailed reports</li>
              <li>Administrators: Full system access and configuration</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default HelpGuide;