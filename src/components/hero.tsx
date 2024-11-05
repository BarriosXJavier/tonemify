const Hero = () => {
  return (
    <section className="text-center space-y-2 my-20 bg-background dark:bg-card p-4 rounded-lg">
      <h1 className="text-6xl font-bold duration-1000 text-primary dark:text-foreground cursor-default text-stroke animate-title max-w-sm:text-3xl md:text-5xl whitespace-nowrap bg-clip-text">
        Tonemify
      </h1>
      <p className="text-2xl text-muted-foreground dark:text-muted-foreground font-semibold">
        Stop tweaking,{" "}
        <span className="text-primary dark:text-foreground">
          Start shipping!
        </span>
      </p>
      <p className="text-sm text-foreground dark:text-muted-foreground">
        Just kidding, Tonemify helps you do it, but faster.🚀
      </p>
    </section>
  );
};

export default Hero;
