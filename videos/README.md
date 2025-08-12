# Videos Directory

This directory should contain video assets for the Pivot Energy Ltd website (optional enhancement).

## Optional Video Content

### 1. Hero Background Video
- **File**: `hero-background.mp4`
- **Duration**: 30-60 seconds (looping)
- **Resolution**: 1920x1080px (Full HD)
- **Format**: MP4 with WebM fallback
- **Content**: Renewable energy operations, solar panels, wind turbines
- **Optimization**: Max 5MB, compressed for web
- **Usage**: Background video in hero section

### 2. Service Videos

#### Wind Energy Service
- **File**: `wind-energy-service.mp4`
- **Duration**: 30-45 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Wind farm operations, turbine installation
- **Optimization**: Max 3MB

#### Solar Power Service
- **File**: `solar-power-service.mp4`
- **Duration**: 30-45 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Solar panel installation, solar farm
- **Optimization**: Max 3MB

#### Waste to Energy Service
- **File**: `waste-to-energy-service.mp4`
- **Duration**: 30-45 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Waste processing, biomass conversion
- **Optimization**: Max 3MB

#### Hydro Power Service
- **File**: `hydro-power-service.mp4`
- **Duration**: 30-45 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Hydroelectric dam, water turbines
- **Optimization**: Max 3MB

### 3. Project Videos

#### Kenya Solar Farm
- **File**: `project-kenya-solar.mp4`
- **Duration**: 60-90 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Project overview, construction, operation
- **Optimization**: Max 5MB

#### South Africa Wind Farm
- **File**: `project-south-africa-wind.mp4`
- **Duration**: 60-90 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Project overview, construction, operation
- **Optimization**: Max 5MB

#### Nigeria Waste to Energy
- **File**: `project-nigeria-waste.mp4`
- **Duration**: 60-90 seconds
- **Resolution**: 1280x720px (HD)
- **Content**: Project overview, construction, operation
- **Optimization**: Max 5MB

## Video Specifications

### Technical Requirements
- **Codec**: H.264 for MP4, VP9 for WebM
- **Frame Rate**: 24-30 fps
- **Bitrate**: 2-5 Mbps for HD content
- **Audio**: AAC (MP4) or Vorbis (WebM)
- **Aspect Ratio**: 16:9 (landscape)

### Optimization Guidelines
1. **Compression**: Use tools like HandBrake or FFmpeg
2. **Multiple Formats**: Provide MP4 and WebM versions
3. **Quality vs Size**: Balance quality with file size
4. **Mobile Optimization**: Consider lower resolution for mobile

### Accessibility
1. **Captions**: Provide SRT or VTT caption files
2. **Audio Description**: Consider audio description tracks
3. **Transcripts**: Provide text transcripts
4. **Controls**: Ensure video players have accessible controls

## Implementation in HTML

### Hero Background Video
```html
<video class="hero-video" autoplay muted loop playsinline>
    <source src="videos/hero-background.mp4" type="video/mp4">
    <source src="videos/hero-background.webm" type="video/webm">
    <!-- Fallback image -->
    <img src="images/hero-background.jpg" alt="Renewable energy landscape">
</video>
```

### Service Video Modal
```html
<div class="video-modal" id="videoModal">
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <video controls>
            <source src="videos/wind-energy-service.mp4" type="video/mp4">
            <source src="videos/wind-energy-service.webm" type="video/webm">
            Your browser does not support the video tag.
        </video>
    </div>
</div>
```

## Performance Considerations

### Lazy Loading
- Load videos only when needed
- Use Intersection Observer for video loading
- Provide poster images for video previews

### Mobile Optimization
- Detect mobile devices and load lower resolution videos
- Consider disabling autoplay on mobile
- Provide alternative content for slow connections

### CDN Usage
- Host videos on a CDN for better performance
- Use adaptive bitrate streaming for longer videos
- Implement proper caching headers

## File Naming Convention

- Use lowercase letters
- Separate words with hyphens
- Include descriptive names
- Example: `solar-panel-installation-process.mp4`

## Video Production Tips

### Content Guidelines
1. **Professional Quality**: High-quality footage and editing
2. **Brand Consistency**: Maintain company branding and colors
3. **Clear Messaging**: Focus on key benefits and solutions
4. **Call to Action**: Include clear next steps for viewers

### Technical Guidelines
1. **Stable Footage**: Use tripods or stabilizers
2. **Good Lighting**: Ensure proper lighting for clear video
3. **Audio Quality**: Use external microphones for better audio
4. **Editing**: Professional editing with smooth transitions

## Alternative Content

For users with slow connections or accessibility needs:
1. **Poster Images**: High-quality still images from videos
2. **Transcripts**: Text versions of video content
3. **Infographics**: Static visual representations
4. **Audio Only**: Audio versions of video content

## Analytics and Tracking

Consider implementing:
1. **Video Analytics**: Track video engagement and completion rates
2. **Heat Maps**: Understand which parts of videos are most watched
3. **A/B Testing**: Test different video content and lengths
4. **Conversion Tracking**: Link video views to business outcomes 