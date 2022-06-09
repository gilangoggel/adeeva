
type Link = Record<'label' | 'href', string>;

type Props = {
  name: string
  links: Link[]
}

export const CollapseNavs = () => {
  return (
    <div>
      CollapseNavs component
    </div>
  );
};
