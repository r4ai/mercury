import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Table>
export default meta

type Story = StoryObj<typeof meta>

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    paymentMethod: "Credit Card",
    amount: "$250.00",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    paymentMethod: "Bank Transfer",
    amount: "$150.00",
  },
  {
    invoice: "INV003",
    paymentStatus: "Paid",
    paymentMethod: "Cash",
    amount: "$350.00",
  },
  {
    invoice: "INV004",
    paymentStatus: "Overdue",
    paymentMethod: "PayPal",
    amount: "$450.00",
  },
]

export const Default: Story = {
  args: {
    children: (
      <>
        <TableCaption>A list of recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(({ amount, invoice, paymentMethod, paymentStatus }) => (
            <TableRow key={invoice}>
              <TableCell className="font-medium">{invoice}</TableCell>
              <TableCell>{paymentStatus}</TableCell>
              <TableCell>{paymentMethod}</TableCell>
              <TableCell className="text-right">{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$1,200.00</TableCell>
          </TableRow>
        </TableFooter>
      </>
    ),
  },
}
