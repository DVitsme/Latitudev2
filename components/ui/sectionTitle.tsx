const SectionTitle = ({text}: {text: string}) => {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--primary,rgb(255,255,255))_0%,var(--secondary,rgb(0,0,0))_100%)] opacity-50" />
      <p className="text-sm text-muted-foreground italic md:text-base">
        {text}
      </p>
      <div className="h-px flex-1 bg-[linear-gradient(270deg,var(--secondary,rgb(0,0,0))_0%,var(--primary,rgb(255,255,255))_100%)] opacity-50" />
    </div>
  );
}

export default SectionTitle