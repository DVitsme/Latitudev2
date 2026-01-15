---
name: Blog post UX improvements
overview: Comprehensive UI/UX improvements for the blog post page following blogging industry best practices, including author info, visual hierarchy, engagement elements, and accessibility enhancements.
todos: []
---

# Blog Post UX Improvements

## Current Analysis

The blog post page at [`app/blog/finding-the-right-fit/page.tsx`](app/blog/finding-the-right-fit/page.tsx) has a solid foundation but is missing several blogging industry best practices that would improve readability, engagement, and credibility.

## Critical Missing Elements

### 1. Author Information & Credibility

**Issue**: No author bio/card displayed in the main content area.

**Industry Standard**: Author information (photo, name, role, brief bio, social links) should appear:

- At the top (after hero, before content)
- At the bottom (after conclusion)

**Fix**:

- Restore the `Author` component and `AUTHOR` constant
- Add author card below hero section
- Optionally add expanded author bio at the end

### 2. Visual Content & Reading Flow

**Issue**: Pure text wall with no images, diagrams, or visual breaks.

**Industry Standard**: Blog posts should include:

- Hero image (feature image) - currently only background
- In-content images every 2-3 paragraphs
- Pull quotes or callouts
- Visual hierarchy with better spacing

**Fix**:

- Add a prominent hero image component (not just background)
- Consider adding relevant stock images or graphics for each section
- Add pull quotes or callout boxes for key points
- Improve prose spacing with better vertical rhythm

### 3. Reader Engagement Elements

**Issue**: Missing engagement and conversion elements.

**Industry Standard**: Include:

- Newsletter signup (above or below fold)
- Related articles section
- Comments section or CTA
- Social share buttons at both top AND bottom
- "Back to Blog" or breadcrumb navigation

**Fix**:

- Add share buttons at the bottom
- Add "Related Articles" section after conclusion
- Add newsletter signup CTA
- Ensure breadcrumbs link back properly

### 4. Typography & Readability

**Issue**: Prose could be more readable.

**Industry Standard**:

- Max content width: 65-75 characters (~680px for prose)
- Line height: 1.6-1.8 for body text
- Larger base font size (18-20px)
- Better heading hierarchy and spacing

**Fix**:

- Ensure `.prose` class has optimal line-height and max-width
- Increase base font size to 18px minimum
- Add more whitespace between sections
- Improve heading sizes and weights

### 5. Reading Progress & Navigation

**Issue**: No reading progress indicator; chapters nav is basic.

**Industry Standard**:

- Reading progress bar at top
- Active chapter highlighting (exists but could be better)
- Scroll-to-top button
- Estimated time remaining

**Fix**:

- Add a reading progress bar
- Enhance chapter nav with visual progress indicators
- Add scroll-to-top FAB (floating action button)

### 6. Meta Information & Trust Signals

**Issue**: Limited metadata display.

**Industry Standard**:

- Author name and credentials
- Publication date AND last updated date
- Article category/tags
- Read time (exists but could be more prominent)

**Fix**:

- Add tags/category badges below title
- Show "Last updated" if different from publish date
- Make author more prominent

### 7. Accessibility & Semantic HTML

**Issue**: Some accessibility improvements needed.

**Standards**:

- Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels for navigation
- Skip links
- Focus indicators
- Alt text for images

**Fix**:

- Add skip-to-content link
- Ensure all interactive elements have proper focus states
- Add ARIA labels to share buttons and nav elements

### 8. Mobile Experience

**Issue**: Chapters sidebar hidden on mobile; could be improved.

**Best Practice**:

- Sticky header with progress on mobile
- Collapsible TOC accessible via FAB
- Optimized touch targets (min 44x44px)

**Fix**:

- Add mobile-friendly TOC toggle
- Ensure all buttons meet touch target sizes
- Test and optimize mobile spacing

## Implementation Priority

### High Priority (Core UX)

1. **Author card** - Add author information at top and bottom
2. **Share buttons at bottom** - Duplicate social sharing at end
3. **Related articles** - Add 2-3 related post cards after conclusion
4. **Reading progress bar** - Visual feedback for scroll depth
5. **Typography improvements** - Better line-height, spacing, and sizes

### Medium Priority (Engagement)

6. **Newsletter CTA** - Add subscription form in sidebar or after content
7. **Hero image** - Make feature image more prominent (not just background)
8. **Pull quotes** - Add visual callouts for key points
9. **Tags/categories** - Display article taxonomy
10. **Scroll-to-top button** - For long-form content

### Low Priority (Polish)

11. **Reading time remaining** - Dynamic calculation
12. **Print styling** - Optimized print layout
13. **Dark mode polish** - Ensure all new elements work in dark mode
14. **Structured data** - JSON-LD for SEO

## Recommended Component Structure

```typescript
<section>
  {/* Hero with prominent feature image */}
  <HeroSection />
  
  <div className="container">
    <div className="lg:flex gap-20">
      {/* Sticky sidebar */}
      <aside>
        <TableOfContents />
        <NewsletterSignup /> {/* Optional */}
      </aside>
      
      {/* Main content */}
      <article>
        <AuthorCard author={AUTHOR} position="top" />
        
        <ArticleMeta 
          date={DATE} 
          readTime={DURATION}
          tags={TAGS}
        />
        
        <div className="prose">
          {/* Content with images */}
        </div>
        
        <SocialShare position="bottom" />
        
        <Conclusion />
        
        <AuthorCard author={AUTHOR} position="bottom" expanded />
        
        <RelatedArticles articles={RELATED} />
      </article>
    </div>
  </div>
  
  {/* Fixed elements */}
  <ReadingProgressBar />
  <ScrollToTop />
</section>
```

## Design References

Look at these industry leaders for inspiration:

- Medium.com - Author cards, typography, reading experience
- CSS-Tricks - Code examples, visual hierarchy
- Smashing Magazine - In-depth technical posts with great UX
- A List Apart - Classic blog layout, excellent typography

## Accessibility Checklist

- [ ] Heading hierarchy is logical (only one h1)
- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Keyboard navigation works throughout
- [ ] Focus indicators are visible
- [ ] Skip to content link present
- [ ] ARIA labels on interactive elements
- [ ] Responsive text sizing (no fixed px for body)

## Performance Considerations

- Use `next/image` for all images with proper sizing
- Lazy load images below fold
- Consider blur placeholder for hero image
- Minimize layout shift with explicit dimensions
- Code-split heavy components (newsletter form, comments)