import {
  CheckIcon,
  ChevronRightIcon,
  CircleQuestionMarkIcon,
  FlameIcon,
  type LucideProps,
  PencilIcon,
  PinIcon,
  RocketIcon,
  TriangleAlertIcon,
} from "lucide-react"
import type {
  FC,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react"
import { tv } from "tailwind-variants"

const calloutStyles = tv({
  slots: {
    root: "group/root my-6 space-y-2 rounded-lg border bg-card p-4",
    title: "flex flex-row items-center gap-2 font-bold",
    icon: "size-5 shrink-0",
    foldIcon: "size-5 shrink-0 transition-transform group-open/root:rotate-90",
    body: "space-y-2",
  },
  variants: {
    color: {
      monochrome: {
        root: "",
        title: "",
      },
      cyan: {
        root: "border-cyan-600/20 bg-cyan-500/10 dark:border-cyan-800/20",
        title: "text-cyan-600 dark:text-cyan-400",
      },
      purple: {
        root: "border-purple-600/20 bg-purple-500/10 dark:border-purple-800/20",
        title: "text-purple-600 dark:text-purple-400",
      },
      green: {
        root: "border-green-600/20 bg-green-500/10 dark:border-green-800/20",
        title: "text-green-600 dark:text-green-400",
      },
      yellow: {
        root: "border-yellow-600/20 bg-yellow-500/10 dark:border-yellow-800/20",
        title: "text-yellow-600 dark:text-yellow-400",
      },
      red: {
        root: "border-red-600/20 bg-red-500/10 dark:border-red-800/20",
        title: "text-red-600 dark:text-red-400",
      },
    },
  },
  defaultVariants: {
    color: "monochrome",
  },
})

type Icon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>

type Callout = {
  label: string
  Icon: Icon
  color: keyof typeof calloutStyles.variants.color
}

const calloutInfos = {
  note: {
    label: "Note",
    Icon: PencilIcon,
    color: "monochrome",
  },
  abstract: {
    label: "Abstract",
    Icon: RocketIcon,
    color: "purple",
  },
  important: {
    label: "Important",
    Icon: PinIcon,
    color: "purple",
  },
  success: {
    label: "Success",
    Icon: CheckIcon,
    color: "green",
  },
  question: {
    label: "Question",
    Icon: CircleQuestionMarkIcon,
    color: "yellow",
  },
  caution: {
    label: "Caution",
    Icon: TriangleAlertIcon,
    color: "red",
  },
  tip: {
    label: "Tip",
    Icon: FlameIcon,
    color: "cyan",
  },
} as const satisfies Record<string, Callout>

const getCalloutInfo = (type: keyof typeof calloutInfos) =>
  calloutInfos[type] ?? calloutInfos.note

export type CalloutProps = {
  type: keyof typeof calloutInfos
  isFoldable: boolean
  defaultFolded?: boolean
  title?: ReactNode
  className?: string
  children: ReactNode
}

export const Callout: FC<CalloutProps> = ({
  type,
  isFoldable,
  defaultFolded,
  title,
  children,
  className,
}) => {
  const isFoldableString = isFoldable ? "true" : "false"
  const defaultFoldedString = defaultFolded ? "true" : "false"

  return (
    <CalloutRoot
      className={className}
      type={type}
      isFoldable={isFoldableString}
      defaultFolded={defaultFoldedString}
    >
      <CalloutTitle type={type} isFoldable={isFoldableString}>
        {title}
      </CalloutTitle>
      <CalloutBody type={type}>{children}</CalloutBody>
    </CalloutRoot>
  )
}

type DetailsProps = {
  isFoldable: boolean
  defaultFolded?: boolean
  children: ReactNode
  className?: string
}

const Details: FC<DetailsProps> = ({
  isFoldable,
  defaultFolded,
  children,
  ...props
}) => {
  return isFoldable ? (
    <details open={!defaultFolded} {...props}>
      {children}
    </details>
  ) : (
    <div {...props}>{children}</div>
  )
}

type SummaryProps = {
  isFoldable: boolean
  children: ReactNode
  className?: string
}

const Summary: FC<SummaryProps> = ({ isFoldable, children, ...props }) => {
  return isFoldable ? (
    <summary {...props}>{children}</summary>
  ) : (
    <div {...props}>{children}</div>
  )
}

export type CalloutRootProps = {
  type: keyof typeof calloutInfos
  isFoldable: "true" | "false"
  defaultFolded?: "true" | "false"
  className?: string | undefined
  children: ReactNode
}

export const CalloutRoot: FC<CalloutRootProps> = ({
  children,
  className,
  type,
  isFoldable: isFoldableString,
  defaultFolded: defaultFoldedString,
}) => {
  const isFoldable = isFoldableString === "true"
  const defaultFolded = defaultFoldedString === "true"
  const calloutInfo = getCalloutInfo(type)
  const { root } = calloutStyles({ color: calloutInfo.color })

  return (
    <Details
      isFoldable={isFoldable}
      defaultFolded={defaultFolded}
      className={root({ className })}
    >
      {children}
    </Details>
  )
}

export type CalloutTitleProps = {
  type: keyof typeof calloutInfos
  className?: string
  children?: ReactNode
  isFoldable: "true" | "false"
}

export const CalloutTitle: FC<CalloutTitleProps> = ({
  type,
  isFoldable: isFoldableString,
  className,
  children,
}) => {
  const { color, Icon, label } = getCalloutInfo(type)
  const isFoldable = isFoldableString === "true"
  const { title, icon, foldIcon } = calloutStyles({ color })

  return (
    <Summary isFoldable={isFoldable} className={title({ className })}>
      <Icon className={icon()} />
      <div>{children ?? label}</div>
      {isFoldable && <ChevronRightIcon className={foldIcon()} />}
    </Summary>
  )
}

export type CalloutBodyProps = {
  type: keyof typeof calloutInfos
  className?: string
  children: ReactNode
}

export const CalloutBody: FC<CalloutBodyProps> = ({
  type,
  children,
  className,
}) => {
  const { color } = getCalloutInfo(type)
  const { body } = calloutStyles({ color })

  return <div className={body({ className })}>{children}</div>
}
