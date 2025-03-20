import supabase from "./supabase";

//> CREATE GUEST
export async function createGuest(guestData) {
  const { data, error } = await supabase
    .from("guests")
    .insert([guestData])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  return data;
}
