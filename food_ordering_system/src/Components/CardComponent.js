export default function CardComponent(args) {
    const params = args.data;
    return (
      <>
        {
            params.map((data)=>(
                <>
                    {data.title}
                    {data.body}
                    {data.footer}
                </>
            ))
        }
      </>
    );
  }