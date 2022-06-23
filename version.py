#!/usr/bin/env python
import re

MAJOR = 'major'
MINOR = 'minor'
PATCH = 'patch'
BETA = 'beta'
ALPHA = 'alpha'
ALL_TYPES = [MAJOR, MINOR, PATCH, BETA, ALPHA]
REGEX = re.compile(
    r'''^(?P<major>\d+).(?P<minor>\d+).(?P<patch>\d+)'''
    r'''(.?(a(?P<alpha>\d+))?|.?(b(?P<beta>\d+)))?$'''
)


def build_version(major, minor, patch, beta=None, alpha=None):
    assert not ((beta is None) and (alpha is None)), 'Only beta or alpha'
    postfix = ''
    if beta:
        postfix = 'b%s' % beta
    elif alpha:
        postfix = 'a%s' % alpha
    return '.'.join((major, minor, patch, postfix))


def parse_version(string):
    """
    >>> parse_version('1.1.0')
    ('1', '1', '0', None, None)
    >>> parse_version('99.22.2')
    ('99', '22', '2', None, None)
    >>> parse_version('2.3.10.a1')
    ('2', '3', '10', None, '1')
    >>> parse_version('52.32.110.b113')
    ('52', '32', '110', '113', None)
    """
    result = REGEX.match(string).groupdict()
    return tuple(result.get(i) for i in ALL_TYPES)
