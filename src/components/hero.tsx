const Hero = () => {
  return (
    <section className="text-center space-y-2 my-20">
      <h1 className="text-6xl font-bold duration-1000 text-primary dark:text-dark-foreground cursor-default text-stroke animate-title max-w-sm:text-3xl md:text-5xl whitespace-nowrap bg-clip-text">
        Tonemify
      </h1>
      <p className="text-2xl text-muted-foreground font-semibold">
        Stop tweaking, <span className="text-primary">Start shipping!</span>
      </p>
      <p className="text-sm">
        Just kidding, with Tonemify you can do it in no time 🚀
      </p>
    </section>
  );
};

export default Hero;
