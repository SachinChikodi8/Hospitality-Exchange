// Middleware
app.use(cors({
    origin: '*', // Allow requests from any origin during development
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204, // HTTP status code for successful CORS preflight requests
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    preflightContinue: false,
  }));
  