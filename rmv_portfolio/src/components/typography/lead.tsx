import { typography } from "@/app/interface/interface";

interface LeadProps extends typography {
  /**
   * Element to render as. Defaults to a paragraph.
   *
   * The hero uses `h1` so the page has a heading, while keeping the lead's
   * smaller visual treatment — a document's h1 identifies its subject, which
   * need not be its largest text.
   */
  as?: "p" | "h1"
  /** Replaces the default muted color/weight, e.g. to spotlight the hero name. */
  className?: string
}

const TypographyLead:React.FC<LeadProps> = ({text, as: Tag = "p", className = "text-muted-foreground"}) => {
  return (
    <Tag className={`text-2xl ${className}`}>
      {text}
    </Tag>
  )
}

export default TypographyLead;
