/**
 * If you have a file that you _need_ to be parsed and
 * processed _before_ anything else, import it here.
 *
 * And example might be registering for some global
 * event listener or possibly needing to run some
 * DB migrations/connections/etc or telemetry/metrics
 */
export default Promise.all([import('./connections/index')])
