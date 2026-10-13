type ProfilePortraitPlaceholderProps = {
  className?: string;
};

export function ProfilePortraitPlaceholder({ className = "" }: ProfilePortraitPlaceholderProps) {
  return (
    <figure aria-label="Abstract profile artwork placeholder; authentic portrait to be supplied by the owner" className={`relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-surface ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#25374c_0%,#141b24_55%,#10151c_100%)]" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 sm:size-64" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 sm:size-48" />
      <div aria-hidden="true" className="absolute left-1/2 top-[42%] size-24 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[2rem] border border-accent/40 bg-accent/5 sm:size-28" />
      <div aria-hidden="true" className="absolute left-[28%] top-[28%] size-2 rounded-full bg-accent" />
      <div aria-hidden="true" className="absolute right-[25%] top-[56%] size-1.5 rounded-full bg-accent/70" />
      <figcaption className="absolute inset-x-5 bottom-5 rounded-xl border border-border/80 bg-background/80 p-4 backdrop-blur-sm">
        <span className="block font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">Profile image</span>
        <span className="mt-1 block text-sm text-secondary">Authentic portrait to be added when supplied</span>
      </figcaption>
    </figure>
  );
}
