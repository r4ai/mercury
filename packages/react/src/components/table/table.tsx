"use client"

import { type ComponentProps, forwardRef } from "react"
import { cn } from "../../libs/utils"

export const Table = forwardRef<HTMLDivElement, ComponentProps<"table">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        data-slot="table-container"
        className="relative w-full overflow-x-auto"
        ref={ref}
      >
        <table
          data-slot="table"
          className={cn("w-full caption-bottom text-sm", className)}
          {...props}
        />
      </div>
    )
  },
)
Table.displayName = "Table"

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<"thead">
>(({ className, ...props }, ref) => {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
})
TableHeader.displayName = "TableHeader"

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<"tbody">
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
})
TableBody.displayName = "TableBody"

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  ComponentProps<"tfoot">
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  )
})
TableFooter.displayName = "TableFooter"

export const TableRow = forwardRef<HTMLTableRowElement, ComponentProps<"tr">>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        data-slot="table-row"
        className={cn(
          "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
          className,
        )}
        {...props}
      />
    )
  },
)
TableRow.displayName = "TableRow"

export const TableHead = forwardRef<HTMLTableCellElement, ComponentProps<"th">>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        data-slot="table-head"
        className={cn(
          "h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          className,
        )}
        {...props}
      />
    )
  },
)
TableHead.displayName = "TableHead"

export const TableCell = forwardRef<HTMLTableCellElement, ComponentProps<"td">>(
  ({ className, ...props }, ref) => {
    return (
      <td
        ref={ref}
        data-slot="table-cell"
        className={cn(
          "whitespace-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
          className,
        )}
        {...props}
      />
    )
  },
)
TableCell.displayName = "TableCell"

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  ComponentProps<"caption">
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-4 text-muted-foreground text-sm", className)}
      {...props}
    />
  )
})
TableCaption.displayName = "TableCaption"
