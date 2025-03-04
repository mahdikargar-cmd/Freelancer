import API from "@/components/api";

interface Link {
  id: number,
  first: string,
  second: string
}

interface list {
  list: Link[]
}

const NotFound = async () => {
  const res = await fetch(`${API}/api/notfound`, { cache: "no-store" });
  const posts : list = await res.json();
  
  return (
    <>
      {
        posts.list.map((items) => (
          <div key={items.id} className="flex items-center justify-center w-screen h-screen bg-black text-white text-[96px] font-mono tracking-tighter relative">
            <div className="relative inline-block animate-bounce" title="404">{items.first}</div>
            <div className="relative inline-block animate-bounce" title="error">{items.second}</div>
          </div>
        ))
      }
    </>
  );
}

export default NotFound;