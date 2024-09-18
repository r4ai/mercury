import { type ComponentPropsWithoutRef, forwardRef } from "react"
import { cn } from "../../libs/utils"

export type ListProps = ComponentPropsWithoutRef<"ul">

export const List = forwardRef<HTMLUListElement, ListProps>(
  ({ className, ...props }, ref) => {
    return (
      <ul
        className={cn(
          "group [&:not(.contains-task-list)]:list-disc [&:not(.contains-task-list)]:pl-6 [&>li]:mt-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
List.displayName = "List"

export type ListItemProps = ComponentPropsWithoutRef<"li">

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, ...props }, ref) => {
    return <li className={cn(className)} ref={ref} {...props} />
  },
)
ListItem.displayName = "ListItem"

export type OrderedListPRops = ComponentPropsWithoutRef<"ol">

export const OrderedList = forwardRef<HTMLOListElement, OrderedListPRops>(
  ({ className, ...props }, ref) => {
    return (
      <ol
        className={cn("list-decimal pl-6 [&>li]:mt-2", className)}
        ref={ref}
        {...props}
      />
    )
  },
)
OrderedList.displayName = "OrderedList"
