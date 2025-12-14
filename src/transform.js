export function transform(input) {
  const nodes = Array.isArray(input?.nodes) ? input.nodes : [];

  let online = 0;
  let offline = 0;

  for (const node of nodes) {
    if (node?.online === true) online++;
    else offline++;
  }

  return { online, offline };
}
