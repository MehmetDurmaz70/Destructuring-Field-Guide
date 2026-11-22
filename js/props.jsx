// Mehmet Durmaz - 2024502045
// Props and children in plain JavaScript (JSX). Run with `npx tsx js/props.jsx`.
import { renderToStaticMarkup } from 'react-dom/server'

// P1: props is ONE object; the parameter pattern takes it apart (forms 5 & 11).
function CardA(props) {
  return <section><h2>{props.title}</h2>{props.children}</section>
}
function CardB({ title, children }) {
  return <section><h2>{title}</h2>{children}</section>
}
console.log('P1 A:', renderToStaticMarkup(<CardA title="Hi">text</CardA>))
console.log('P1 B:', renderToStaticMarkup(<CardB title="Hi">text</CardB>))

// P2: children is only a prop (JSX tag body vs explicit children attribute).
console.log('P2 body:', renderToStaticMarkup(<CardB title="Note">text</CardB>))
console.log('P2 attr:', renderToStaticMarkup(<CardB title="Note" children="text" />))

// P3: what children can be (string, number, single element, array/multiple elements, undefined, null, false, function).
function Box({ label, children }) {
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

// P4: separating children from the rest ({ title, children, ...rest }) and spread order.
function PanelSpreadFirst({ title, children, ...rest }) {
  return (
    <section {...rest} data-role="panel">
      <h3>{title}</h3>
      {children}
    </section>
  )
}
function PanelSpreadLast({ title, children, ...rest }) {
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

// P5: props vs children — layout with header/footer props vs children-only composition.
function SplitLayout({ header, footer, children }) {
  return (
    <article>
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </article>
  )
}
function FreeLayout({ children }) {
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

// P6: defaults in props (form 7) — undefined triggers default, null does not.
function Badge({ label = 'Default Label', count = 0 }) {
  return <span>{label}: {String(count)}</span>
}
console.log('P6 omitted:', renderToStaticMarkup(<Badge />))
console.log('P6 undefined:', renderToStaticMarkup(<Badge label={undefined} count={undefined} />))
console.log('P6 null:', renderToStaticMarkup(<Badge label={null} count={null} />))