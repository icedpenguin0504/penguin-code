const { Component } = require('inferno');
const gravatrHelper = require('hexo-util').gravatar;
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

class Profile extends Component {
    renderSocialLinks(links) {
        if (!links.length) {
            return null;
        }
        return <div class="level is-mobile centered-slim-box">
            {links.filter(link => typeof link === 'object').map(link => {
                return <div class="level-item is-marginless is-paddingless">
                          <a class="button is-transparent is-paddingless"
                          target="_blank" rel="noopener" title={link.name} href={link.url}>
                          {'icon' in link ? <i class={link.icon + ' is-size-3 text-gray'}></i> : link.name}
                          </a>
                        </div>;
            })}
        </div>;
    }

    render() {
        const {
            avatar,
            avatarRounded,
            author,
            authorTitle,
            location,
            counter,
            followLink,
            followTitle,
            socialLinks
        } = this.props;
        return <div class="card widget">
            <div class="card-content">
                <nav class="level">
                    <div class="level-item has-text-centered flex-shrink-1">
                        <div>
                            <figure class="image is-128x128 mx-auto mb-2">
                                <img class={avatarRounded ? 'is-rounded' : ''} src={avatar} alt={author} />
                            </figure>
                            {author ? <p class="title is-size-4 is-block line-height-inherit">{author}</p> : null}
                            {authorTitle ? <p class="is-size-6 is-block">{authorTitle}</p> : null}
                            {location ? <p class="is-size-6 is-flex justify-content-center mt-1">
                                <i class="fas fa-map-marker-alt mr-1"></i>
                                <span>{location}</span>
                            </p> : null}
                        </div>
                    </div>
                </nav>
                {socialLinks ? this.renderSocialLinks(socialLinks) : null}
            </div>
        </div>;
    }
}

Profile.Cacheable = cacheComponent(Profile, 'widget.profile', props => {
    const { site, helper, widget } = props;
    const {
        avatar,
        gravatar,
        avatar_rounded = false,
        author = props.config.author,
        author_title,
        location,
        follow_link,
        social_links
    } = widget;
    const { url_for, _p, __ } = helper;

    function getAvatar() {
        if (gravatar) {
            return gravatrHelper(gravatar, 128);
        }
        if (avatar) {
            return url_for(avatar);
        }
        return url_for('/img/avatar.png');
    }

    const postCount = site.posts.length;
    const categoryCount = site.categories.filter(category => category.length).length;
    const tagCount = site.tags.filter(tag => tag.length).length;

    const socialLinks = social_links ? Object.keys(social_links).map(name => {
        const link = social_links[name];
        if (typeof link === 'string') {
            return {
                name,
                url: url_for(link)
            };
        }
        return {
            name,
            url: url_for(link.url),
            icon: link.icon
        };
    }) : null;

    return {
        avatar: getAvatar(),
        avatarRounded: avatar_rounded,
        author,
        authorTitle: author_title,
        location,
        counter: {
            post: {
                count: postCount,
                title: _p('common.post', postCount),
                url: url_for('/archives')
            },
            category: {
                count: categoryCount,
                title: _p('common.category', categoryCount),
                url: url_for('/categories')
            },
            tag: {
                count: tagCount,
                title: _p('common.tag', tagCount),
                url: url_for('/tags')
            }
        },
        followLink: url_for(follow_link),
        followTitle: __('widget.follow'),
        socialLinks
    };
});

module.exports = Profile;
