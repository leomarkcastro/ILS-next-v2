export function ConditionalBold({ children, condition }) {
  if (condition) {
    return <strong>{children}</strong>;
  } else {
    return <>{children}</>;
  }
}
