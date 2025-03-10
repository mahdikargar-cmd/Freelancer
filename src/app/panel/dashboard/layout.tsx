import NavPro from "@/components/headerDash"
export default function Layout({
    children 
  }: {
    children: React.ReactNode,
    header: React.ReactNode
  }) {
    return (
      <>
      <NavPro />
        {children}
      </>
    )
  }