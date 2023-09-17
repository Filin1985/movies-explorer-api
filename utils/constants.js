const RESPONSE_MESSAGES = {
  400: {
    users: {
      cast: 'Requested data not found!',
      invalidSignup: 'Incorrect data sent during user registration',
      invalidUpdate: 'Incorrect data passed when updating user profile data',
    },

    movies: {
      invalidSaving: 'Incorrect data was sent when saving a movie',
    },
  },

  401: {
    users: {
      invalidAuth: 'Authorization required',
    },
  },

  403: {
    movies: {
      invalidAccessRights: 'You have no right to delete other people`s movies!',
    },
  },

  404: {
    users: {
      notFoundUserId: 'User with this id was not found',
      invalidEmail: 'User with this email is not registered',
    },

    movies: {
      notFoundMovieId: 'Movie data for the user with the specified id was not found',
      dataNotFound: 'Movie data for the specified id was not found',
    },
  },

  409: {
    users: {
      duplicateEmail: 'A user with this email already exists',
    },
  },
};

module.exports = RESPONSE_MESSAGES;
