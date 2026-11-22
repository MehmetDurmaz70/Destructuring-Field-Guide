// Mehmet Durmaz - 2024502045
// Props and children in TypeScript. Run with `npx tsx ts/props.tsx`.
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

type CardProps = { title: string; children?: ReactNode }

// P1: props is one object; CardA and CardB express the same signature (forms 5 & 11).
function CardA(props: CardProps) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }: CardProps) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P1 A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('P1 B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))

// P2: children is just a prop (<CardB>text</CardB> === <CardB children="text" />).
console.log('P2 body:', renderToStaticMarkup(<CardB title="Note">text</CardB>))
console.log('P2 attr:', renderToStaticMarkup(<CardB title="Note" children="text" />))

// P3: valid ReactNode children + render-prop function pattern.
type BoxProps = {
  label: string
  children?: ReactNode | ((topic: string) => ReactNode)
}
function Box({ label, children }: BoxProps) {
  return <div data-label={label}>{typeof children === 'function' ? children('MIS 233') : children}</div>
}
console.log('P3 string:', renderToStaticMarkup(<Box label="str">{'Sourdough'}</Box>))
console.log('P3 number:', renderToStaticMarkup(<Box label="num">{42}</Box>))
console.log('P3 one-el:', renderToStaticMarkup(<Box label="one"><span>Leaf</span></Box>))
console.log(
  'P3 multi-el:',
  renderToStaticMarkup(
    <Box label="multi">
      <span>Broccoli</span>
      <span>Leek</span>
    </Box>,
  ),
)
console.log('P3 undefined:', renderToStaticMarkup(<Box label="undef">{undefined}</Box>))
console.log('P3 null:', renderToStaticMarkup(<Box label="null">{null}</Box>))
console.log('P3 false:', renderToStaticMarkup(<Box label="false">{false}</Box>))
console.log('P3 fn:', renderToStaticMarkup(<Box label="fn">{(course) => <em>{course}</em>}</Box>))

// P4: separating children and spreading ...rest onto <section> (order determines override).
type PanelProps = ComponentProps<'section'> & { title: string }
function PanelSpreadFirst({ title, children, ...rest }: PanelProps) {
  return (
    <section {...rest} data-role="panel">
      <h3>{title}</h3>
      {children}
    </section>
  )
}
function PanelSpreadLast({ title, children, ...rest }: PanelProps) {
  return (
    <section data-role="panel" {...rest}>
      <h3>{title}</h3>
      {children}
    </section>
  )
}
console.log(
  'P4 spread-first:',
  renderToStaticMarkup(<PanelSpreadFirst title="Log" id="p1" data-role="custom">Entry</PanelSpreadFirst>),
)
console.log(
  'P4 spread-last:',
  renderToStaticMarkup(<PanelSpreadLast title="Log" id="p1" data-role="custom">Entry</PanelSpreadLast>),
)

// P5: named slot props (header/footer) vs children-only composition.
type SplitLayoutProps = PropsWithChildren<{ header: ReactNode; footer: ReactNode }>
function SplitLayout({ header, footer, children }: SplitLayoutProps) {
  return (
    <article>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </article>
  )
}
function FreeLayout({ children }: PropsWithChildren) {
  return <article>{children}</article>
}
console.log(
  'P5 named-props:',
  renderToStaticMarkup(
    <SplitLayout header={<h1>Garden</h1>} footer={<small>2026</small>}>
      <p>Bed A</p>
    </SplitLayout>,
  ),
)
console.log(
  'P5 children-only:',
  renderToStaticMarkup(
    <FreeLayout>
      <h1>Garden</h1>
      <p>Bed A</p>
      <small>2026</small>
    </FreeLayout>,
  ),
)

// P6: defaults in typed props (undefined triggers default, null does not).
type BadgeProps = { label?: string | null; count?: number | null }
function Badge({ label = 'Default Label', count = 0 }: BadgeProps) {
  return <span>{label}: {String(count)}</span>
}
console.log('P6 omitted:', renderToStaticMarkup(<Badge />))
console.log('P6 undefined:', renderToStaticMarkup(<Badge label={undefined} count={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Badge label={null} count={null} />))

// P7: children?: ReactNode vs PropsWithChildren vs ComponentProps<'button'>
type StrictTitleOnly = { title: string }
function HeaderOnly({ title }: StrictTitleOnly) {
  return <h4>{title}</h4>
}
// @ts-expect-error Type '{ title: string; children: string; }' is not assignable to 'StrictTitleOnly'
const invalidUsage = <HeaderOnly title="No children allowed">Oops</HeaderOnly>
void invalidUsage

type AlertProps = PropsWithChildren<{ severity: 'info' | 'warn' }>
function Alert({ severity, children }: AlertProps) {
  return <div className={severity}>{children}</div>
}

type ActionButtonProps = ComponentProps<'button'> & { variant?: 'primary' | 'ghost' }
function ActionButton({ variant = 'primary', type = 'button', children, ...rest }: ActionButtonProps) {
  return (
    <button type={type} data-variant={variant} {...rest}>
      {children}
    </button>
  )
}
console.log('P7 Alert:', renderToStaticMarkup(<Alert severity="info">Saved</Alert>))
console.log(
  'P7 Button:',
  renderToStaticMarkup(<ActionButton onClick={() => {}} disabled>Submit</ActionButton>),
)