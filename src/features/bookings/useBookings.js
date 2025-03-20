import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClinet = useQueryClient();
  const [searchParams] = useSearchParams();

  //> FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //> SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  //> PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //> QUERY
  const {
    isLoading,
    data: { data: bookings = [], count = 0 } = {}, // MENAMBAHKAN DEFAULT VALUE AGAR TIDAK ERROR SAAT PERTAMA DIRENDER
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // MENAMBAHKAN DEPEDENCY ARRAY AGAR DAPAT MELAKUKAN RE-FETCHING
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  //> PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClinet.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClinet.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
