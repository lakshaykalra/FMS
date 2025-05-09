export const MESSAGES = {
  USER: {
    CREATE_SUCCESS: 'User created successfully',
    CREATE_FAILURE: 'Failed to create user',
    CREATE_FAILURE_DUPLICATE_EMAIL: 'Email already exists',
    FETCH_SUCCESS: 'Users fetched successfully',
    FETCH_FAILURE: 'Failed to fetch users',
    FETCH_ONE_SUCCESS: 'User fetched successfully',
    FETCH_ONE_FAILURE: 'Failed to fetch user',
    UPDATE_SUCCESS: 'User updated successfully',
    UPDATE_FAILURE: 'Failed to update user',
    UPDATE_FAILURE_DUPLICATE_EMAIL: 'Email already exists for another user',
    DELETE_SUCCESS: 'User deleted successfully',
    DELETE_FAILURE: 'Failed to delete user',
  },
  FLIGHT: {
    CREATE_SUCCESS: 'Flight created successfully',
    CREATE_FAILURE: 'Failed to create flight',
    FETCH_SUCCESS: 'Flights fetched successfully',
    FETCH_FAILURE: 'Failed to fetch flights',
    FETCH_ONE_SUCCESS: 'Flight fetched successfully',
    FETCH_ONE_FAILURE: 'Failed to fetch flight',
    UPDATE_SUCCESS: 'Flight updated successfully',
    UPDATE_FAILURE: 'Failed to update flight',
    DELETE_SUCCESS: 'Flight deleted successfully',
    DELETE_FAILURE: 'Failed to delete flight',
    NOT_FOUND: 'Flight with ID {id} not found',
  },
  FARE: {
    CREATE_SUCCESS: 'Fare created successfully',
    CREATE_FAILURE: 'Failed to create fare',
    FETCH_SUCCESS: 'Fares fetched successfully',
    FETCH_FAILURE: 'Failed to fetch fares',
    FETCH_ONE_SUCCESS: 'Fare fetched successfully',
    FETCH_ONE_FAILURE: 'Failed to fetch fare',
    UPDATE_SUCCESS: 'Fare updated successfully',
    UPDATE_FAILURE: 'Failed to update fare',
    DELETE_SUCCESS: 'Fare deleted successfully',
    DELETE_FAILURE: 'Failed to delete fare',
    NOT_FOUND: 'Fare with ID {id} not found',
  },
  BOOKING: {
    CREATE_SUCCESS: 'Booking created successfully',
    CREATE_FAILURE: 'Failed to create booking',
    FETCH_SUCCESS: 'Bookings fetched successfully',
    FETCH_FAILURE: 'Failed to fetch bookings',
    FETCH_ONE_SUCCESS: 'Booking fetched successfully',
    FETCH_ONE_FAILURE: 'Failed to fetch booking',
    UPDATE_SUCCESS: 'Booking updated successfully',
    UPDATE_FAILURE: 'Failed to update booking',
    DELETE_SUCCESS: 'Booking deleted successfully',
    DELETE_FAILURE: 'Failed to delete booking',
    CANCEL_SUCCESS: 'Booking canceled successfully',
    CANCEL_FAILURE: 'Failed to cancel the booking',
    NOT_FOUND: 'Booking not found',
    UNAUTHORIZED: 'User not authorized to cancel this booking',
    ALREADY_CANCELED: 'Booking already canceled',
    USER_NOT_FOUND: 'User not found',
    FLIGHT_NOT_FOUND: 'Flight not found',
    SEATS_INVALID: 'One or more seats are invalid or not available for this flight',
    SEATS_ALREADY_BOOKED: 'One or more seats are already booked',
  },
  APP: {
    HEALTHY: 'App and Postgres connection are healthy',
    QUERY_FAILED: 'Postgres query failed',
    CONNECTION_FAILED: 'Postgres connection failed',
  },
};
