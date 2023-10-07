export default function useProgram(mainMeals, excercises) {
  const handleMeals = mainMeals
    ? mainMeals.map((item) => {
        return {
          name: item.name,
          extra: item.extraMeals.map((i) => {
            return {
              name: i.name,
              details: i.details,
              calories: i.calories,
              way: i.way || "",
              image: i.image,
            };
          }),
        };
      })
    : [];

  const handleExcersices = excercises
    ? excercises.map((item) => {
        return {
          name: item.name,
          details: item.details,
          tools: item.tools,
          duration: item.duration,
          reps: item.reps,
          calories: item.calories,
          images: item.images,
        };
      })
    : [];

  return { handleMeals, handleExcersices };
}
