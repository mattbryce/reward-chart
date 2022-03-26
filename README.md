# reward-chart
> Chart the progress of good behavior by star rewards. Take them away for poor behavior.

Full Stack application with a React front end with node API backend to JSON data file. Built as a way to award stars to my kids for good :smile: behaviour and remove them for poor :frowning_face:

![](/screenshots/reward-chart-screenshot.png)

## Prerequistites

* node
* pm2

## Installation

```sh
git clone https://github.com/mattbryce/reward-chart.git
cd reward-chart/client
npm install
cd ../api
npm install
```
## API Driven Data Usage Example

There is a maximum of 10 stars to award. Star value will not go into negative. Optionally, stars reset to zero every Monday @ 00:00. (This only applies to the default API data)

This is achieved via node-schedule using a [Recurrence Rule](https://www.npmjs.com/package/node-schedule) and can be easily enabled or schedule changed by adjusting as below.

```js
var reset = true; // set to true to clear the stars at a set day/time
...
const rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = 1;
    rule.hour = 0;
    rule.minute = 0;
```
## Local (Read-Only) Driven Data Usage example

###  Disabled by default 

It can run in a React read only format without the node API backend but the JSON file needs manually updating. May be useful if you don't want the stars editable via the web page.
>This is a separate data source to the API option. They may be amalgamated in a future update.

React can't write to a JSON file, hence the reason for the node backend to update the json data file

## Development setup

<!-- Describe how to install all development dependencies and how to run an automated test-suite of some kind. Potentially do this for multiple platforms. -->

```sh
pm2 stop reward-chart && pm2 delete reward-chart && pm2 start --name reward-chart 'npm run dev' -- start
```
## Accessing

Open a browser on the same local network at http://HOSTNAME:3000

The API can be tested by going to http://HOSTNAME:9000/user/list which should return something like:

```json
[
    {
    "name":"Child2",
    "stars":5},
    {
    "name":"Child1",
    "stars":3
    }
]
```
The values can ammended manually via the JSON file at:
```
/api/data.json
``` 

It is also possible to use something like Postman to update, add or delete users via the API. In a future update this will be possible via the client.

Content should in RAW body

### List Users - GET Method
http://HOSTNAME:9000/user/list

### Return Single User - GET Method
http://HOSTNAME:9000/user/USER

### Add User - POST Method
http://HOSTNAME:9000/user/add

### Update User - PUT Method
http://HOSTNAME:9000/user/update/USER

### Delete User - Delete Method
http://HOSTNAME:9000/user/delete/USER

## License

Distributed under the MIT license. See ``LICENSE`` for more information.

## Contributing

1. Fork it (<https://github.com/mattbryce/reward-chart/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request


