# Blinkest
## Blink, Blinker, Blinkest!

### Overview
Blinkest is an app to search, sort, and inspect used cars.

Using our application, users can: 
 * Sort vehicles by Year, Make, Model, Mileage, or Posted Date
 * Search for vehicles by any combination of Year, Make, or Model
 * View all results in a list view, with pagination for easier navigation
 * Click on any result in the list to get more detail about a vehicle
 
 In the detail view, a user can see the following information about the vehicle:
  * Vehicle image (if provided)
  * Year, Make, and Model
  * Drivetrain (if available)
  * BodyStyle (if available)
  * Posted Date
  
  The application is responsive and adaptive, working well from smartphones to desktop monitors. 
 
 
 
### Installation:
 * To run the app:
   * Clone this Repo
   * `$ npm install`
   * `$ npm start`
 * Tests are written with Jest:
   * Run `$ npm test`
   * And then `$ a` to run all tests
   
   
   
### Some other technical notes:
 * On the VehicleDetail page, when a corrupt image comes in, a local fallback image is used
 * For the Search logic
   * Strings will immediately return results that have any partial match
   * Numbers entered will only return if they are an exact match
 * Notes on Pagination
   * A very simple version of pagination was implemented to increase performance
   * Results displayed per page can be modified by the `PAGE_SIZE` constant in `constants.js`
   * Note: for this basic implementation, if you choose to change `PAGE_SIZE` please note the current UI recommendations (based on the API endpoint having ~2,000 post entries)
      * Desktop: `PAGE_SIZE` should be greater than 100
      * Tablet: `PAGE_SIZE` should be greater than 150
      * Mobile: since this basic pagination implementation on mobile only shows `First Prev {current} Next Last` any size can be used for `PAGE_SIZE`
   * To avoid user confusion, any Search or Sorting actions will reset the Pagination to page 1
   
