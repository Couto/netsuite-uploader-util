import test from 'ava';
import manifestDiff from '../lib/manifestDiff';

test('should do nothing if build checksum is the same', t => {
  t.deepEqual(manifestDiff({ sum: 1 }, { sum: 1 }), {
    added: [],
    changed: [],
    removed: [],
  });
});

test('should find added files', t => {
  t.deepEqual(
    manifestDiff(
      {
        sum: 1,
        snapshot: [
          {
            name: 'a',
            sum: 'a',
          },
          {
            name: 'b',
            sum: 'b',
          },
        ],
      },
      {
        sum: 2,
        snapshot: [
          {
            name: 'a',
            sum: 'a',
          },
        ],
      }
    ),
    {
      added: [
        {
          name: 'b',
          sum: 'b',
        },
      ],
      changed: [],
      removed: [],
    }
  );
});

test('should find changed files', t => {
  t.deepEqual(
    manifestDiff(
      {
        sum: 1,
        snapshot: [
          {
            name: 'a',
            sum: 'a',
          },
          {
            name: 'b',
            sum: 'b',
          },
        ],
      },
      {
        sum: 2,
        snapshot: [
          {
            name: 'a',
            sum: 'a',
          },
          {
            name: 'b',
            sum: 'b1',
          },
        ],
      }
    ),
    {
      added: [],
      changed: [
        {
          name: 'b',
          sum: 'b',
        },
      ],
      removed: [],
    }
  );
});

test('should find deleted files', t => {
  t.deepEqual(
    manifestDiff(
      {
        sum: 1,
        snapshot: [],
      },
      {
        sum: 2,
        snapshot: [
          {
            name: 'a',
            sum: 'a',
          },
        ],
      }
    ),
    {
      added: [],
      changed: [],
      removed: [
        {
          name: 'a',
          sum: 'a',
        },
      ],
    }
  );
});
