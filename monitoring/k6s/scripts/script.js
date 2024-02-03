import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
    const params = {
          headers: {
           'Content-Type': 'application/json',
            'Access-Token': '',
            'Client-Code': '',
            'X-Person-Id': ''
          }
      };

    http.get('http://host.docker.internal:8091/api/v3/utility/colors', params);
    sleep(1);
}