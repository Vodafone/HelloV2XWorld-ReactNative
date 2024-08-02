export function itsMarker(size: number, angle: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" zoomAndPan="magnify"
     viewBox="0 0 60 60" height="${size}" preserveAspectRatio="xMidYMid meet" version="1.0">
    <defs>
        <clipPath id="c5af3cd1cb">
            <path d="M 1.574219 1.574219 L 58.425781 1.574219 L 58.425781 58.425781 L 1.574219 58.425781 Z M 1.574219 1.574219 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="3be05fd01d">
            <path d="M 30 1.574219 C 14.300781 1.574219 1.574219 14.300781 1.574219 30 C 1.574219 45.699219 14.300781 58.425781 30 58.425781 C 45.699219 58.425781 58.425781 45.699219 58.425781 30 C 58.425781 14.300781 45.699219 1.574219 30 1.574219 Z M 30 1.574219 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="5a9338af4a">
            <path d="M 7.570312 6 L 52.496094 6 L 52.496094 45.253906 L 7.570312 45.253906 Z M 7.570312 6 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="3988c8d17c">
            <path d="M 30 6 L 52.429688 45.253906 L 7.570312 45.253906 Z M 30 6 " clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="698aa38855">
            <path d="M 6.785156 30 L 53.230469 30 L 53.230469 45.726562 L 6.785156 45.726562 Z M 6.785156 30 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="b37b51c627">
            <path d="M 30 30 L 53.214844 45.726562 L 6.785156 45.726562 Z M 30 30 " clip-rule="nonzero"/>
        </clipPath>
    </defs>
    <g clip-path="url(#c5af3cd1cb)" transform="rotate(${angle} 30 30)">
        <g clip-path="url(#3be05fd01d)">
            <path fill="#38b6ff"
                  d="M 1.574219 1.574219 L 58.425781 1.574219 L 58.425781 58.425781 L 1.574219 58.425781 Z M 1.574219 1.574219 "
                  fill-opacity="1" fill-rule="nonzero"/>
        </g>
    </g>
    <g clip-path="url(#5a9338af4a)" transform="rotate(${angle} 30 30)">
        <g clip-path="url(#3988c8d17c)">
            <path fill="#ffffff"
                  d="M 7.570312 6 L 52.496094 6 L 52.496094 45.253906 L 7.570312 45.253906 Z M 7.570312 6 "
                  fill-opacity="1" fill-rule="nonzero"/>
        </g>
    </g>
    <g clip-path="url(#698aa38855)" transform="rotate(${angle} 30 30)">
        <g clip-path="url(#b37b51c627)">
            <path fill="#38b6ff"
                  d="M 6.785156 30 L 53.230469 30 L 53.230469 45.726562 L 6.785156 45.726562 Z M 6.785156 30 "
                  fill-opacity="1" fill-rule="nonzero"/>
        </g>
    </g>
</svg>`;
}

export function camMarker(size: number, angle: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${size}" zoomAndPan="magnify"
     viewBox="0 0 60 60" height="${size}" preserveAspectRatio="xMidYMid meet" version="1.0">
    <defs>
        <clipPath id="4eb6cf6f25">
            <path d="M 1.574219 1.574219 L 58.425781 1.574219 L 58.425781 58.425781 L 1.574219 58.425781 Z M 1.574219 1.574219 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="a467c4d7de">
            <path d="M 30 1.574219 C 14.300781 1.574219 1.574219 14.300781 1.574219 30 C 1.574219 45.699219 14.300781 58.425781 30 58.425781 C 45.699219 58.425781 58.425781 45.699219 58.425781 30 C 58.425781 14.300781 45.699219 1.574219 30 1.574219 Z M 30 1.574219 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="a381f8fd48">
            <path d="M 7.570312 6 L 52.496094 6 L 52.496094 45.253906 L 7.570312 45.253906 Z M 7.570312 6 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="92b094494f">
            <path d="M 30 6 L 52.429688 45.253906 L 7.570312 45.253906 Z M 30 6 " clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="c541906135">
            <path d="M 6.785156 30 L 53.230469 30 L 53.230469 45.726562 L 6.785156 45.726562 Z M 6.785156 30 "
                  clip-rule="nonzero"/>
        </clipPath>
        <clipPath id="ba312dee15">
            <path d="M 30 30 L 53.214844 45.726562 L 6.785156 45.726562 Z M 30 30 " clip-rule="nonzero"/>
        </clipPath>
    </defs>
    <g clip-path="url(#4eb6cf6f25)" transform="rotate(${angle} 30 30)">
        <g clip-path="url(#a467c4d7de)">
            <path fill="#ff3131"
                  d="M 1.574219 1.574219 L 58.425781 1.574219 L 58.425781 58.425781 L 1.574219 58.425781 Z M 1.574219 1.574219 "
                  fill-opacity="1" fill-rule="nonzero"/>
        </g>
    </g>
    <g clip-path="url(#a381f8fd48)" transform="rotate(${angle} 30 30)">
        <g clip-path="url(#92b094494f)">
            <path fill="#ffffff"
                  d="M 7.570312 6 L 52.496094 6 L 52.496094 45.253906 L 7.570312 45.253906 Z M 7.570312 6 "
                  fill-opacity="1" fill-rule="nonzero"/>
        </g>
    </g>
    <g clip-path="url(#c541906135)" transform="rotate(${angle} 30 30)">
        <g clip-path="url(#ba312dee15)">
            <path fill="#ff3131"
                  d="M 6.785156 30 L 53.230469 30 L 53.230469 45.726562 L 6.785156 45.726562 Z M 6.785156 30 "
                  fill-opacity="1" fill-rule="nonzero"/>
        </g>
    </g>
</svg>`;
}
